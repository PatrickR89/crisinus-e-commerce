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
    axios
      .post("/api/news/", {
        headers: header(),
        title,
        images,
        text
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        const info = `${title} news added`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        const err = `api: /api/news [addnews[POST]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });

    navigate("/admin/news/list", { replace: true });
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

  const getNewsList = () => {
    dispatch({ type: LOAD_INITIATED });
    axios
      .get("/api/news/")
      .then((response) => {
        dispatch({ type: LOAD_ARRAY, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        const err = `api: /api/news/ [listnews[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const findById = (header, id) => {
    dispatch({ type: LOAD_INITIATED });
    axios
      .post(`/api/news/${id}`, { headers: header(), id })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        dispatch({
          type: LOAD_VALUE,
          payload: response.data[0]
        });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        const err = `api: /api/news/${id} [editnews[POST]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const editById = (header, id) => {
    const { title, images, text } = state.news;
    axios
      .put(`/api/news/${id}`, {
        headers: header(),
        id,
        title,
        images,
        text
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        const info = `${id} news edited`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        const err = `api: /api/news/${id} [editnews[PUT]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });

    navigate("/admin/news/list", { replace: true });
  };

  const deleteById = (header, id) => {
    axios
      .delete(`/api/news/${id}`, {
        headers: header(),
        data: { id: id }
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        const info = `${id} news deleted`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        const err = `api: /api/news/${id} [editnews[DELETE]], error: ${error}`;
        axios.post("/api/system/error", { err });
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
