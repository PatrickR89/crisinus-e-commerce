import React, { useContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  LOAD_ARRAY,
  LOAD_INITIATED,
  ERROR_OCCURRED,
  LOAD_INFO,
  SET_IMAGES,
  UPDATE_VALUE
} from "../../actions/admin/info_actions";

import reducer from "../../reducers/admin/info_reducer";

const initialState = {
  loading: false,
  error: false,
  items: [],
  item: {}
};

const InfoContext = React.createContext();

export const InfoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const updateValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (value === undefined || value === null) {
      value = "";
    }

    dispatch({ type: UPDATE_VALUE, payload: { name, value } });
  };

  const getInfoPages = () => {
    dispatch({ type: LOAD_INITIATED });
    axios
      .get("/api/infopages/")
      .then((response) => {
        dispatch({ type: LOAD_ARRAY, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        const err = `api: /api/infopages/ [infolist[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const getLinks = () => {
    dispatch({ type: LOAD_INITIATED });
    axios
      .get("/api/links")
      .then((response) => {
        dispatch({ type: LOAD_ARRAY, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        const err = `api: /api/links/ [linkslist[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const resetTable = (header) => {
    axios
      .post("/api/infopages/reset", { headers: header() })
      .then((response) => {
        if (
          response.data === "Token required" ||
          response.data.auth === false
        ) {
          return navigate("/admin/login", { replace: true });
        } else {
          dispatch({ type: LOAD_ARRAY, payload: response.data });
        }
      })
      .catch((error) => {
        const err = `api: /api/infopages/reset [infolist[POST]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const findInfoById = (header, id) => {
    dispatch({ type: LOAD_INITIATED });
    axios
      .post(`/api/infopages/${id}`, {
        headers: header(),
        id
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        dispatch({ type: LOAD_INFO, payload: response.data[0] });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        const err = `api: /api/infopages/${id} [editinfo[POST]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const editInfoById = (header, id) => {
    const { images, content } = state.item;
    axios
      .put(`/api/infopages/${id}`, {
        headers: header(),
        id,
        images,
        content
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        const info = `${id} info edited`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        const err = `api: /api/infopages/${id} [editinfo[PUT]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
    navigate("/admin/information/info", { replace: true });
  };

  const findLinkById = (header, id) => {
    dispatch({ type: LOAD_INITIATED });

    axios
      .post("/api/links", {
        headers: header(),
        id
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        dispatch({ type: LOAD_INFO, payload: response.data[0] });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });

        const err = `api: /api/links/${id} [editlinks[POST]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const editLinkById = (header, id) => {
    const { link } = state.item;
    axios
      .put(`/api/links/${id}`, {
        headers: header(),
        id,
        link
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        const info = `${id} link edited`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        const err = `api: /api/links/${id} [editlinks[PUT]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
    navigate("/admin/information/links", { replace: true });
  };

  const handleAddImages = (e) => {
    const data = new FormData();
    const files = [...e.target.files];
    files.forEach((file) => {
      data.append("images", file);
    });

    axios
      .post("/api/images/addimages", data)
      .then((res) => {
        const tempImages = [...state.gift.images];
        res.data.forEach((image) => {
          tempImages.push(image.path);
        });
        dispatch({ type: SET_IMAGES, payload: tempImages });
      })
      .catch((error) => {
        const err = `api: api/images/addimages [addgift[POST]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const handleDeleteImage = (url) => {
    axios.post("/api/images/deleteimages", { url }).catch((error) => {
      const err = `api: /api/images/deleteimage [editgift[POST]], error: ${error}`;
      axios.post("/api/system/error", { err });
    });
    const tempImages = state.gift.images.filter((image) => image !== url);
    dispatch({ type: SET_IMAGES, payload: tempImages });
  };

  return (
    <InfoContext.Provider
      value={{
        ...state,
        getInfoPages,
        resetTable,
        getLinks,
        findInfoById,
        handleAddImages,
        handleDeleteImage,
        editInfoById,
        updateValue,
        findLinkById,
        editLinkById
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export const useInfoContext = () => {
  return useContext(InfoContext);
};
