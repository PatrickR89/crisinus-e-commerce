import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/items_reducer";
import {
  GET_ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_SINGLE_ITEM_START,
  GET_SINGLE_ITEM_SUCCESS,
  GET_SINGLE_ITEM_ERROR,
  GET_ITEMS_DONE,
  GET_SINGLE_ITEM_DONE
} from "../actions/items_actions";

import mockBooks from "../mockData/mockBooks";
import mockGifts from "../mockData/mockGifts";

const initialState = {
  items_loading: true,
  items_error: false,
  books: [],
  gifts: [],
  single_item_loading: true,
  single_item_error: false,
  single_item: {}
};

const ItemsContext = React.createContext();

export const ItemsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchItems = async () => {
    dispatch({ type: GET_ITEMS_START });
    try {
      const books = await mockBooks;
      const gifts = await mockGifts;
      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: [books, gifts]
      });
      setTimeout(() => {
        dispatch({ type: GET_ITEMS_DONE });
      }, 300);
    } catch (error) {
      dispatch({ GET_ITEMS_ERROR });
    }
  };

  const fetchSingleBook = (id) => {
    dispatch({ type: GET_SINGLE_ITEM_START });
    try {
      const singleBook = mockBooks.find((book) => book.id === parseInt(id));
      dispatch({ type: GET_SINGLE_ITEM_SUCCESS, payload: singleBook });
      setTimeout(() => {
        dispatch({ type: GET_SINGLE_ITEM_DONE });
      }, 500);
    } catch (error) {
      dispatch({ type: GET_SINGLE_ITEM_ERROR });
    }
  };

  const fetchSingleGift = (id) => {
    dispatch({ type: GET_SINGLE_ITEM_START });
    try {
      const singleGift = mockGifts.find((gift) => gift.id === parseInt(id));
      dispatch({ type: GET_SINGLE_ITEM_SUCCESS, payload: singleGift });
      setTimeout(() => {
        dispatch({ type: GET_SINGLE_ITEM_DONE });
      }, 300);
    } catch (error) {
      dispatch({ type: GET_SINGLE_ITEM_ERROR });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ItemsContext.Provider
      value={{ ...state, fetchSingleBook, fetchSingleGift }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const useItemsContext = () => {
  return useContext(ItemsContext);
};
