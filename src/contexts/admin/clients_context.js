import React, { useContext, useReducer } from "react";
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
  CLOSE_MODAL,
  SET_ORDER_STATUS,
  TOGGLE_ORDER_MODAL,
  ERROR_CLEARED
} from "../../actions/admin/clients_actions";

import reducer from "../../reducers/admin/clients_reducer";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useErrorReport } from "../../hooks/useErrorReport";

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
  orderPage: {
    orderList: [],
    order: {},
    cart: [],
    totalAmount: 0,
    status: "",
    isModal: false
  },
  isModal: false
};

const ClientsContext = React.createContext();

export const ClientsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const checkAuth = useCheckAuth();
  const errorReport = useErrorReport();

  const msgUrl = "/api/messages/";
  const ordUrl = "/api/orders/";

  const header = () => {
    return { "x-access-token": localStorage.getItem("token") };
  };

  const findAllMsgs = () => {
    dispatch({ type: LOAD_INITIATED });
    const url = msgUrl;
    const method = "get";
    axios({
      url: url,
      method: method,
      headers: header()
    })
      .then((response) => {
        checkAuth(response);
        const data = response.data;
        dispatch({ type: FETCH_MESSAGES, payload: data.reverse() });
      })
      .catch(function (error) {
        dispatch({ type: ERROR_OCCURRED });

        errorReport(error, url, window.location.pathname, method);
      });
  };

  const findMsgById = (id) => {
    const url = `${msgUrl}${id}`;
    const method = "get";
    axios({
      url: url,
      method: method,
      headers: header()
    })
      .then((response) => {
        checkAuth(response);
        dispatch({ type: FETCH_MESSAGE, payload: response.data });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const handleMessage = (id, status) => {
    findMsgById(id);
    if (status == "NEW") {
      handleConfirm("CHECKED", id);
    }
    dispatch({ type: OPEN_MODAL });
  };

  const handleConfirm = (status, id) => {
    const url = `${msgUrl}${id}`;
    const method = "put";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { status }
    })
      .then((response) => {
        checkAuth(response);
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const deleteMsgById = (id) => {
    const url = `${msgUrl}${id}`;
    const method = "delete";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id: id }
    })
      .then((response) => {
        checkAuth(response);
        return navigate("/admin/clients/messages", { replace: true });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const findAllOrders = () => {
    dispatch({ type: LOAD_INITIATED });
    const url = ordUrl;
    const method = "get";
    axios({
      url: url,
      method: method,
      headers: header()
    })
      .then((response) => {
        checkAuth(response);
        const data = response.data;
        dispatch({ type: FETCH_ORDERS, payload: data.reverse() });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const findOrderById = (id) => {
    dispatch({ type: LOAD_INITIATED });
    const url = `${ordUrl}${id}`;
    const method = "post";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id }
    })
      .then((response) => {
        checkAuth(response);
        dispatch({ type: FETCH_ORDER, payload: response.data[0] });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const setOrderStatus = (id, status) => {
    dispatch({ type: SET_ORDER_STATUS, payload: status });
    const url = `${ordUrl}${id}`;
    const method = "put";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id, status }
    })
      .then((response) => {
        checkAuth(response);
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const deleteOrderById = (id) => {
    const url = `${ordUrl}${id}`;
    const method = "delete";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id: id }
    })
      .then((response) => {
        checkAuth(response);
        return navigate("/admin/clients/orders", { replace: true });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const toggleModal = () => {
    const toggle = state.orderPage.isModal;
    dispatch({
      type: TOGGLE_ORDER_MODAL,
      payload: toggle
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

  const clearError = () => {
    dispatch({ type: ERROR_CLEARED });
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
        setStatusColor,
        findAllOrders,
        findOrderById,
        setOrderStatus,
        deleteOrderById,
        toggleModal,
        clearError
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export const useClientsContext = () => {
  return useContext(ClientsContext);
};
