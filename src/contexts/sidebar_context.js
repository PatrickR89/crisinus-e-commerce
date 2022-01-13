import React, { useContext, useReducer, useEffect, useRef } from "react";
import reducer from "../reducers/sidebar_reducer";
import {
  SIDEBARNAV_CLOSE,
  SIDEBARNAV_OPEN,
  SIDEBAR_BOOKS_CLOSE,
  SIDEBAR_BOOKS_OPEN,
  SIDEBAR_AR_CLOSE,
  SIDEBAR_AR_OPEN
} from "../actions/sidebar_actions";

const initialState = {
  isSidebarNavOpen: false,
  isSidebarBooksOpen: false,
  isSidebarAROpen: false
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
  const openSidebarBooks = () => {
    dispatch({ type: SIDEBAR_BOOKS_OPEN });
  };
  const closeSidebarBooks = () => {
    dispatch({ type: SIDEBAR_BOOKS_CLOSE });
  };
  const openSidebarAR = () => {
    dispatch({ type: SIDEBAR_AR_OPEN });
  };
  const closeSidebarAR = () => {
    dispatch({ type: SIDEBAR_AR_CLOSE });
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
      if (
        state.isSidebarBooksOpen &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        closeSidebarBooks();
      }
      if (
        state.isSidebarAROpen &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        closeSidebarAR();
      }
    };
    document.addEventListener("mousedown", outsideClick);

    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
  }, [state.isSidebarNavOpen, state.isSidebarBooksOpen, state.isSidebarAROpen]);

  return (
    <SidebarContext.Provider
      value={{
        ...state,
        openSidebarNav,
        closeSidebarNav,
        openSidebarBooks,
        closeSidebarBooks,
        openSidebarAR,
        closeSidebarAR,
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
