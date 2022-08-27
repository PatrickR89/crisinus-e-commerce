import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FETCH_MESSAGE,
  FETCH_MESSAGES,
  FETCH_ORDER,
  FETCH_ORDERS,
  LOAD_INITIATED,
  ERROR_OCCURRED,
  OPEN_MODAL,
  CLOSE_MODAL
} from "../../actions/admin/clients_actions";

import reducer from "../../reducers/admin/clients_reducer";

const initialState = {
  loading: false,
  error: false,
  messages: [],
  message: {
    id: 0,
    name: "",
    email: "",
    date: "",
    status: "",
    message: ""
  },
  isModal: false
};

const ClientsContext = React.createContext();

export const ClientsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const header = () => {
    return { "x-access-token": localStorage.getItem("token") };
  };

  const findAllMsgs = () => {
    dispatch({ type: LOAD_INITIATED });
    axios
      .get("/api/messages/", { headers: header() })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        const data = response.data;
        dispatch({ type: FETCH_MESSAGES, payload: data.reverse() });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        const err = `api: /api/orders [orderlist[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const findMsgById = (id) => {
    axios
      .get(`/api/messages/${id}`, { headers: header() })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        dispatch({ type: FETCH_MESSAGE, payload: response.data });
      })
      .catch((error) => {
        const err = `api: /api/orders [orderlist[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const handleMessage = (id, status) => {
    findMsgById(id);
    if (status == "NEW") {
      handleConfirm("CHECKED", id);
    }
    dispatch({ type: OPEN_MODAL });
  };

  const handleConfirm = async (status, id) => {
    await axios
      .put(`/api/messages/${id}`, {
        headers: header(),
        status
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
      })
      .catch((error) => {
        const err = `api: /api/orders/${id} [singleorder[PUT]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const deleteMsgById = async (id) => {
    await axios
      .delete(`/api/messages/${id}`, {
        headers: header(),
        data: { id: id }
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
      })
      .catch((error) => {
        const err = `api: /api/orders/${id} [singleorder[DELETE]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const closeModal = () => {
    const msg = {
      id: 0,
      name: "",
      email: "",
      date: "",
      status: "",
      message: ""
    };
    dispatch({ type: CLOSE_MODAL });
    findAllMsgs();
    dispatch({ type: FETCH_MESSAGE, payload: msg });
  };

  const setStatusColor = (msgStatus) => {
    if (msgStatus === "NEW") {
      return "red-background";
    } else if (msgStatus === "CHECKED") {
      return "yellow-background";
    } else if (msgStatus === "CONFIRMED") {
      return "green-background";
    }
  };

  return (
    <ClientsContext.Provider
      value={{
        ...state,
        findAllMsgs,
        findMsgById,
        handleConfirm,
        handleMessage,
        closeModal,
        deleteMsgById,
        setStatusColor
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export const useClientsContext = () => {
  return useContext(ClientsContext);
};
