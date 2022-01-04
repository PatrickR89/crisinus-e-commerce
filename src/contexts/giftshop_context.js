import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/giftshop_reducer";
import {
  GET_ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_SINGLE_ITEM_START,
  GET_SINGLE_ITEM_SUCCESS,
  GET_SINGLE_ITEM_ERROR
} from "../actions/items_actions";

import mockGifts from "../mockData/mockGifts";

const initialState = {
  gifts_loading: true,
  gifts_error: false,
  gifts: [],
  single_gift_loading: true,
  single_gift_error: false,
  single_gift: {}
};

const GiftshopContext = React.createContext();

export const GiftshopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchGifts = async () => {
    dispatch({ type: GET_ITEMS_START });
    try {
      const gifts = await mockGifts;
      dispatch({ type: GET_ITEMS_SUCCESS, payload: gifts });
    } catch (error) {
      dispatch({ GET_ITEMS_ERROR });
    }
  };

  const fetchSingleGift = (id) => {
    dispatch({ type: GET_SINGLE_ITEM_START });
    try {
      const singleGift = mockGifts.find((gift) => gift.id === parseInt(id));
      dispatch({ type: GET_SINGLE_ITEM_SUCCESS, payload: singleGift });
    } catch (error) {
      dispatch({ type: GET_SINGLE_ITEM_ERROR });
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  return (
    <GiftshopContext.Provider value={{ ...state, fetchSingleGift }}>
      {children}
    </GiftshopContext.Provider>
  );
};

export const useGiftshopContext = () => {
  return useContext(GiftshopContext);
};
