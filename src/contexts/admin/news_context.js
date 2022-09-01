import React, { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  UPDATE_VALUE,
  SET_IMAGES,
  LOAD_VALUE,
  LOAD_ARRAY,
  LOAD_INITIATED,
  ERROR_OCCURRED
} from "../../actions/admin/news_actions";

import reducer from "../../reducers/admin/news_reducer";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useErrorReport } from "../../hooks/useErrorReport";

const initialState = {
  loading: false,
  error: false,
  newsList: [],
  news: {
    title: "",
    images: [],
    text: ""
  }
};

const NewsContext = React.createContext();

export const NewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const checkAuth = useCheckAuth();
  const errorReport = useErrorReport();
  const baseUrl = "/api/news/";

  const resetForm = () => {
    const news = {
      title: "",
      images: [],
      text: ""
    };
    dispatch({
      type: LOAD_VALUE,
      payload: news
    });
  };

  const updateValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (value === undefined || value === null) {
      value = "";
    }

    dispatch({ type: UPDATE_VALUE, payload: { name, value } });
  };

  const addNews = (header) => {
    const { title, images, text } = state.news;

    const url = baseUrl;
    const method = "post";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { title, images, text }
    })
      .then((response) => {
        checkAuth(response);
        const info = `${title} news added`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });

    navigate("/admin/news/list", { replace: true });
  };

  const handleAddImages = (e) => {
    const data = new FormData();
    const files = [...e.target.files];
    files.forEach((file) => {
      data.append("images", file);
    });
    const url = "/api/images/addimages";
    const method = "post";
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
        errorReport(error, url, window.location.pathname, method);
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

  const getNewsList = () => {
    dispatch({ type: LOAD_INITIATED });
    const url = baseUrl;
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

  const findById = (header, id) => {
    dispatch({ type: LOAD_INITIATED });
    const url = `${baseUrl}${id}`;
    const method = "post";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id }
    })
      .then((response) => {
        checkAuth(response);
        dispatch({
          type: LOAD_VALUE,
          payload: response.data[0]
        });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const editById = (header, id) => {
    const { title, images, text } = state.news;
    const url = `${baseUrl}${id}`;
    const method = "put";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id, title, images, text }
    })
      .then((response) => {
        checkAuth(response);
        const info = `${id} news edited`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });

    navigate("/admin/news/list", { replace: true });
  };

  const deleteById = (header, id) => {
    const url = `${baseUrl}${id}`;
    const method = "delete";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id: id }
    })
      .then((response) => {
        checkAuth(response);
        const info = `${id} news deleted`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
    navigate("/admin/news/list", { replace: true });
  };

  const formatDate = (date) => {
    const tempDate = new Date(date);
    const doubleDigit = (num) => {
      return num.toString().padStart(2, "0");
    };
    return [
      doubleDigit(tempDate.getDate()),
      doubleDigit(tempDate.getMonth() + 1),
      tempDate.getFullYear()
    ].join("/");
  };

  return (
    <NewsContext.Provider
      value={{
        ...state,
        updateValue,
        handleAddImages,
        handleDeleteImage,
        addNews,
        resetForm,
        getNewsList,
        formatDate,
        findById,
        editById,
        deleteById
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => {
  return useContext(NewsContext);
};
