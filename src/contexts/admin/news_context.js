import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {};

import {} from "../../actions/admin/news_actions";

import reducer from "../../reducers/admin/news_reducer";

const NewsContext = React.createContext();

export const NewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NewsContext.Provider value={{ ...state }}>{children}</NewsContext.Provider>
  );
};

export const useNewsContext = () => {
  return useContext(NewsContext);
};
