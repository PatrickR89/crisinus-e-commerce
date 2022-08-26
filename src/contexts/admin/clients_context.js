import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {};

import {} from "../../actions/admin/clients_actions";

import reducer from "../../reducers/admin/clients_reducer";

const ClientsContext = React.createContext();

export const ClientsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ClientsContext.Provider value={{ ...state }}>
      {children}
    </ClientsContext.Provider>
  );
};

export const useClientsContext = () => {
  return useContext(ClientsContext);
};
