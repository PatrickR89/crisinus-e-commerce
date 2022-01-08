import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer
} from "react";
import reducer from "../reducers/items_reducer";
import {
  GET_ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_SINGLE_ITEM_START,
  GET_SINGLE_ITEM_SUCCESS,
  GET_SINGLE_ITEM_ERROR,
  GET_ITEMS_DONE,
  GET_SINGLE_ITEM_DONE,
  UPDATE_SIZE,
  UPDATE_LENGTH,
  UPDATE_LENGTH_SEPARATE
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
  single_item: {},
  screen_width: 0,
  home_page_items: 10,
  items_list_length: 8
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

  const updateSize = () => {
    dispatch({ type: UPDATE_SIZE, payload: window.innerWidth });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (state.screen_width > 1000) {
      dispatch({ type: UPDATE_LENGTH, payload: 10 });
      dispatch({ type: UPDATE_LENGTH_SEPARATE, payload: 8 });
    }
    if (state.screen_width < 1000) {
      dispatch({ type: UPDATE_LENGTH, payload: 6 });
      dispatch({ type: UPDATE_LENGTH_SEPARATE, payload: 6 });
    }
    if (state.screen_width < 650) {
      dispatch({ type: UPDATE_LENGTH, payload: 4 });
      dispatch({ type: UPDATE_LENGTH_SEPARATE, payload: 4 });
    }
  }, [state.screen_width]);

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
