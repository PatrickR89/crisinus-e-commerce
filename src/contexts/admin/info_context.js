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

import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useErrorReport } from "../../hooks/useErrorReport";

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
  const checkAuth = useCheckAuth();
  const errorReport = useErrorReport();
  const linksUrl = "/api/links/";
  const infoUrl = "/api/infopages/";

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
    const url = `${infoUrl}`;
    const method = "get";
    axios({
      url: url,
      method: method
    })
      .then((response) => {
        dispatch({ type: LOAD_ARRAY, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const getLinks = () => {
    dispatch({ type: LOAD_INITIATED });
    const url = `${linksUrl}`;
    const method = "get";
    axios({
      url: url,
      method: method
    })
      .then((response) => {
        dispatch({ type: LOAD_ARRAY, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const resetTable = (header) => {
    const url = `${infoUrl}reset`;
    const method = "post";
    axios({
      url: url,
      method: method,
      headers: header()
    })
      .then((response) => {
        checkAuth(response);
        dispatch({ type: LOAD_ARRAY, payload: response.data });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const findInfoById = (header, id) => {
    dispatch({ type: LOAD_INITIATED });
    const url = `${infoUrl}${id}`;
    const method = "post";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id }
    })
      .then((response) => {
        checkAuth(response);
        dispatch({ type: LOAD_INFO, payload: response.data[0] });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const editInfoById = (header, id) => {
    const { images, content } = state.item;
    const url = `${infoUrl}${id}`;
    const method = "put";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id, images, content }
    })
      .then((response) => {
        checkAuth(response);
        const info = `${id} info edited`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
    navigate("/admin/information/info", { replace: true });
  };

  const findLinkById = (header, id) => {
    dispatch({ type: LOAD_INITIATED });
    const url = `${linksUrl}`;
    const method = "post";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id }
    })
      .then((response) => {
        checkAuth(response);
        dispatch({ type: LOAD_INFO, payload: response.data[0] });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const editLinkById = (header, id) => {
    const { link } = state.item;
    const url = `${linksUrl}${id}`;
    const method = "put";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id, link }
    })
      .then((response) => {
        checkAuth(response);
        const info = `${id} link edited`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
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
