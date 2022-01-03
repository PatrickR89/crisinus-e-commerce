import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/books_reducer";
import {
  GET_ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_SINGLE_ITEM_START,
  GET_SINGLE_ITEM_SUCCESS,
  GET_SINGLE_ITEM_ERROR
} from "../actions/items_actions";

import mockBooks from "../mockData/mockBooks";

const initialState = {
  books_loading: true,
  books_error: false,
  books: [],
  single_book_loading: true,
  single_book_error: false,
  single_book: {}
};

const BooksContext = React.createContext();

export const BooksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchBooks = async () => {
    dispatch({ type: GET_ITEMS_START });
    try {
      const books = await mockBooks;
      dispatch({ type: GET_ITEMS_SUCCESS, payload: books });
    } catch (error) {
      dispatch({ GET_ITEMS_ERROR });
    }
  };

  const fetchSingleBook = (id) => {
    dispatch({ type: GET_SINGLE_ITEM_START });
    try {
      const singleBook = mockBooks.find((book) => book.id === parseInt(id));
      dispatch({ type: GET_SINGLE_ITEM_SUCCESS, payload: singleBook });
    } catch (error) {
      dispatch({ type: GET_SINGLE_ITEM_ERROR });
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ ...state, fetchSingleBook }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = () => {
  return useContext(BooksContext);
};
