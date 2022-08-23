import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {};

import {} from "../../actions/admin/giftshop_actions";

import reducer from "../../reducers/admin/giftshop_reducer";

const GiftshopContext = React.createContext();

export const GiftshopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GiftshopContext.Provider value={{ ...state }}>
      {children}
    </GiftshopContext.Provider>
  );
};

export const useGiftshopContext = () => {
  return useContext(GiftshopContext);
};
