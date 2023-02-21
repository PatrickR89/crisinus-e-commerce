import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/authors_reducer";
import { useAuthenticationContext } from "../contexts/authentication_context";

import {
  GET_ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  SET_BOOKS_PER_AUTHOR,
  SET_AUTHORS_IDS,
  SET_ACTIVE_AUTHOR
} from "../actions/authors_actions";
import { useErrorReport } from "../hooks/useErrorReport";

const initialState = {
  booksByAuthor: [],
  isLoading: true,
  isError: false,
  authors: [],
  books: [],
  authorID: "",
  activeAuthor: {}
};

const AuthorsContext = React.createContext();

export const AuthorsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { clientEngaged } = useAuthenticationContext();
  const errorReport = useErrorReport();
  const baseUrl = "/api/public/authors";

  const fetchItems = () => {
    dispatch({ type: GET_ITEMS_START });

    const url = baseUrl;
    const method = "get";
    axios({
      url: url,
      method: method,
      timeout: 800
    })
      .then((response) => {
        console.log(response.data);
        const booksImport = response.data[1];
        const authorsImport = response.data[0];
        dispatch({
          type: GET_ITEMS_SUCCESS,
          payload: [booksImport, authorsImport]
        });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
        dispatch({ GET_ITEMS_ERROR });
      });
  };

  useEffect(() => {
    if (clientEngaged === true) {
      fetchItems();
    }
  }, [clientEngaged]);

  useEffect(() => {
    dispatch({ type: SET_AUTHORS_IDS, payload: state.books });
  }, [state.books]);

  const changeAuthor = async (author) => {
    dispatch({ type: GET_ITEMS_START });
    const url = baseUrl;
    const method = "post";
    axios({
      url: url,
      method: method,
      data: { author }
    })
      .then((response) => {
        const fullAuthor = response.data[0];
        dispatch({ type: SET_ACTIVE_AUTHOR, payload: fullAuthor });
        dispatch({
          type: SET_BOOKS_PER_AUTHOR,
          payload: [state.books, fullAuthor.id]
        });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
        dispatch({ GET_ITEMS_ERROR });
      });
  };

  return (
    <AuthorsContext.Provider value={{ ...state, changeAuthor }}>
      {children}
    </AuthorsContext.Provider>
  );
};

export const useAuthorsContext = () => {
  return useContext(AuthorsContext);
};
