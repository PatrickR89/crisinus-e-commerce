import React, { useContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  UPDATE_VALUE,
  SET_IMAGES,
  LOAD_GIFT,
  LOAD_ARRAY,
  LOAD_INITIATED,
  ERROR_OCCURRED
} from "../../actions/admin/giftshop_actions";

import reducer from "../../reducers/admin/giftshop_reducer";

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
    axios
      .post("/api/giftshop/", {
        headers: header(),
        name,
        price,
        max_order,
        images,
        description
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        const info = `${name} gift added`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        const err = `api: /api/giftshop/ [addgift[POST]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });

    navigate("/admin/giftshoplist", { replace: true });
  };

  const getGifts = () => {
    dispatch({ type: LOAD_INITIATED });
    axios
      .get("/api/giftshop/")
      .then((response) => {
        dispatch({ type: LOAD_ARRAY, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        const err = `api: /api/giftshop/} [giftslist[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const findById = (header, id) => {
    dispatch({ type: LOAD_INITIATED });

    axios
      .post(`/api/giftshop/${id}`, { headers: header(), id })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });

        dispatch({
          type: LOAD_GIFT,
          payload: response.data[0]
        });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });

        const err = `api: /api/giftshop/${id} [editgift[POST]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const editById = (header, id) => {
    const { name, price, max_order, images, description } = state.gift;
    axios
      .put(`/api/giftshop/${id}`, {
        headers: header(),
        id,
        name,
        price,
        max_order,
        images,
        description
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        const info = `${id} gift edited`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        const err = `api: /api/giftshop/${id} [editgift[PUT]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
    navigate("/admin/giftshop/list", { replace: true });
  };

  const deleteById = (header, id) => {
    axios
      .delete(`/api/giftshop/${id}`, {
        headers: header(),
        data: { id: id }
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/api/admin/login", { replace: true });
        const info = `${id} gift deleted`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        const err = `api: /api/giftshop/${id} [editgift[DELETE]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
    navigate("/admin/giftshop/list", { replace: true });
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
        deleteById
      }}
    >
      {children}
    </GiftshopContext.Provider>
  );
};

export const useGiftshopContext = () => {
  return useContext(GiftshopContext);
};
