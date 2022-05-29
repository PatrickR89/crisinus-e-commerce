import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_TOTALS,
  OPEN_MODAL,
  CLOSE_MODAL,
  UPDATE_CLIENT,
  SET_CL_NAME_ERR_TRUE,
  SET_CL_NAME_ERR_FALSE,
  SET_CL_LASTNAME_ERR_TRUE,
  SET_CL_LASTNAME_ERR_FALSE,
  SET_CL_EMAIL_ERR_TRUE,
  SET_CL_EMAIL_ERR_FALSE,
  SET_CL_ST_NUM_ERR_TRUE,
  SET_CL_ST_NUM_ERR_FALSE,
  SET_CL_ST_NAME_ERR_TRUE,
  SET_CL_ST_NAME_ERR_FALSE,
  SET_CL_CITY_ERR_TRUE,
  SET_CL_CITY_ERR_FALSE,
  SET_CL_POST_CODE_ERR_TRUE,
  SET_CL_POST_CODE_ERR_FALSE
} from "../actions/cart_actions";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");

  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  isModalOpen: false,
  cartOrder: {
    clientName: "",
    clientLastName: "",
    clientEmail: "",
    streetNumber: "",
    streetName: "",
    city: "",
    postalCode: 0
  },
  cartError: {
    clientNameError: true,
    clientLastNameError: true,
    clientEmailError: true,
    streetNumberError: true,
    streetNameError: true,
    cityError: true,
    postalCodeError: true
  }
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, amount, item) => {
    dispatch({ type: ADD_ITEM, payload: { id, amount, item } });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: id });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_ITEM_AMOUNT, payload: { id, value } });
  };

  const openModal = () => {
    dispatch({ type: OPEN_MODAL });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const updateClient = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    dispatch({ type: UPDATE_CLIENT, payload: { name, value } });
  };

  // CART VALIDATION

  useEffect(() => {
    if (state.cartOrder.clientName === "") {
      dispatch({ type: SET_CL_NAME_ERR_TRUE });
    } else {
      dispatch({ type: SET_CL_NAME_ERR_FALSE });
    }
  }, [state.cartOrder.clientName]);

  useEffect(() => {
    if (state.cartOrder.clientLastName === "") {
      dispatch({ type: SET_CL_LASTNAME_ERR_TRUE });
    } else {
      dispatch({ type: SET_CL_LASTNAME_ERR_FALSE });
    }
  }, [state.cartOrder.clientLastName]);

  useEffect(() => {
    if (state.cartOrder.clientEmail === "") {
      dispatch({ type: SET_CL_EMAIL_ERR_TRUE });
    } else {
      dispatch({ type: SET_CL_EMAIL_ERR_FALSE });
    }
  }, [state.cartOrder.clientEmail]);

  useEffect(() => {
    if (state.cartOrder.streetNumber === "") {
      dispatch({ type: SET_CL_ST_NUM_ERR_TRUE });
    } else {
      dispatch({ type: SET_CL_ST_NUM_ERR_FALSE });
    }
  }, [state.cartOrder.streetNumber]);

  useEffect(() => {
    if (state.cartOrder.streetName === "") {
      dispatch({ type: SET_CL_ST_NAME_ERR_TRUE });
    } else {
      dispatch({ type: SET_CL_ST_NAME_ERR_FALSE });
    }
  }, [state.cartOrder.streetName]);

  useEffect(() => {
    if (state.cartOrder.city === "") {
      dispatch({ type: SET_CL_CITY_ERR_TRUE });
    } else {
      dispatch({ type: SET_CL_CITY_ERR_FALSE });
    }
  }, [state.cartOrder.city]);

  useEffect(() => {
    if (state.cartOrder.postalCode === 0) {
      dispatch({ type: SET_CL_POST_CODE_ERR_TRUE });
    } else {
      dispatch({ type: SET_CL_POST_CODE_ERR_FALSE });
    }
  }, [state.cartOrder.postalCode]);

  useEffect(() => {
    dispatch({ type: COUNT_TOTALS });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        toggleAmount,
        openModal,
        closeModal,
        updateClient
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
