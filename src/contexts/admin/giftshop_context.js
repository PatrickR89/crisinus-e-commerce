import React, { useContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  UPDATE_VALUE,
  SET_IMAGES,
  LOAD_GIFT,
  LOAD_ARRAY,
  LOAD_INITIATED,
  ERROR_OCCURRED,
  ERROR_CLEARED
} from "../../actions/admin/giftshop_actions";

import reducer from "../../reducers/admin/giftshop_reducer";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useErrorReport } from "../../hooks/useErrorReport";

const initialState = {
  gifts: [],
  gift: {
    name: "",
    price: 0,
    max_order: 0,
    images: [],
    description: ""
  },
  loading: false,
  error: false
};

const GiftshopContext = React.createContext();

export const GiftshopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const checkAuth = useCheckAuth();
  const errorReport = useErrorReport();
  const baseUrl = "/api/giftshop/";

  const updateValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (value === undefined || value === null) {
      value = "";
    }

    dispatch({ type: UPDATE_VALUE, payload: { name, value } });
  };

  const resetForm = () => {
    const gift = {
      name: "",
      price: 0,
      max_order: 0,
      images: [],
      description: ""
    };
    dispatch({
      type: LOAD_GIFT,
      payload: gift
    });
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

  const addGift = (header) => {
    const { name, price, max_order, images, description } = state.gift;
    const url = `${baseUrl}`;
    const method = "post";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { name, price, max_order, images, description }
    })
      .then((response) => {
        checkAuth(response);
        const info = `${name} gift added`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });

    navigate("/admin/giftshop/list", { replace: true });
  };

  const getGifts = () => {
    dispatch({ type: LOAD_INITIATED });
    const url = `${baseUrl}`;
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
          type: LOAD_GIFT,
          payload: response.data[0]
        });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });

        errorReport(error, url, window.location.pathname, method);
      });
  };

  const editById = (header, id) => {
    const { name, price, max_order, images, description } = state.gift;
    const url = `${baseUrl}${id}`;
    const method = "put";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id, name, price, max_order, images, description }
    })
      .then((response) => {
        checkAuth(response);
        const info = `${id} gift edited`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
    navigate("/admin/giftshop/list", { replace: true });
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
        const info = `${id} gift deleted`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
    navigate("/admin/giftshop/list", { replace: true });
  };

  const clearError = () => {
    dispatch({ type: ERROR_CLEARED });
  };

  return (
    <GiftshopContext.Provider
      value={{
        ...state,
        updateValue,
        handleAddImages,
        handleDeleteImage,
        resetForm,
        addGift,
        getGifts,
        findById,
        editById,
        deleteById,
        clearError
      }}
    >
      {children}
    </GiftshopContext.Provider>
  );
};

export const useGiftshopContext = () => {
  return useContext(GiftshopContext);
};
