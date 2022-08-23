import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {};

import {} from "../../actions/admin/info_actions";

import reducer from "../../reducers/admin/info_reducer";

const InfoContext = React.createContext();

export const InfoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <InfoContext.Provider value={{ ...state }}>{children}</InfoContext.Provider>
  );
};

export const useInfoContext = () => {
  return useContext(InfoContext);
};
