import React, { useContext, useReducer, useEffect, useRef } from "react";
import reducer from "../reducers/sidebar_reducer";
import {
  SIDEBARNAV_CLOSE,
  SIDEBARNAV_OPEN,
  SIDEBAR_AUTHORS_CLOSE,
  SIDEBAR_AUTHORS_OPEN
} from "../actions/sidebar_actions";

const initialState = {
  isSidebarNavOpen: false,
  isSidebarAuthorsOpen: false
};

const SidebarContext = React.createContext();

export const SidebarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const ref = useRef();

  const openSidebarNav = () => {
    dispatch({ type: SIDEBARNAV_OPEN });
  };
  const closeSidebarNav = () => {
    dispatch({ type: SIDEBARNAV_CLOSE });
  };
  const openSidebarAuthors = () => {
    dispatch({ type: SIDEBAR_AUTHORS_OPEN });
  };
  const closeSidebarAuthors = () => {
    dispatch({ type: SIDEBAR_AUTHORS_CLOSE });
  };

  useEffect(() => {
    const outsideClick = (e) => {
      if (
        state.isSidebarNavOpen &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        closeSidebarNav();
      }
    };
    document.addEventListener("mousedown", outsideClick);

    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
  }, [state.isSidebarNavOpen]);

  return (
    <SidebarContext.Provider
      value={{
        ...state,
        openSidebarNav,
        closeSidebarNav,
        openSidebarAuthors,
        closeSidebarAuthors,
        ref
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
