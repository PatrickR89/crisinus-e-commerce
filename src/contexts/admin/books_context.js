import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {};

import {} from "../../actions/admin/books_actions";

import reducer from "../../reducers/admin/books_reducer";

const BooksContext = React.createContext();

export const BooksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BooksContext.Provider value={{ ...state }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = () => {
  return useContext(BooksContext);
};
