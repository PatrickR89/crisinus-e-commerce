import React, { useContext, useReducer, useEffect } from "react";
import reducer from "../reducers/sidebar_reducer";
import { SIDEBARNAV_CLOSE, SIDEBARNAV_OPEN } from "../actions/sidebar_actions";

const initialState = {
  isSidebarNavOpen: false
};

const SidebarContext = React.createContext();

export const SidebarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebarNav = () => {
    dispatch({ type: SIDEBARNAV_OPEN });
  };
  const closeSidebarNav = () => {
    dispatch({ type: SIDEBARNAV_CLOSE });
  };

  return (
    <SidebarContext.Provider
      value={{ ...state, openSidebarNav, closeSidebarNav }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
