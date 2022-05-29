import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_TOTALS,
  OPEN_MODAL,
  CLOSE_MODAL
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
    clientAdress: {
      streetNumber: "",
      streetName: "",
      city: "",
      postalCode: 0
    }
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
        closeModal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
