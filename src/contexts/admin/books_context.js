import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {};

import {} from "../../actions/admin/authors_actions";

import reducer from "../../reducers/admin/authors_reducer";

const AuthorsContext = React.createContext();

export const AuthorsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthorsContext.Provider value={{ ...state }}>
      {children}
    </AuthorsContext.Provider>
  );
};

export const useAuthorsContext = () => {
  return useContext(AuthorsContext);
};
