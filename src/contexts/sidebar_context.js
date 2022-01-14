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

  const ref_nav = useRef();
  const ref_books = useRef();
  const ref_ar = useRef();

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
    const outsideClickNav = (e) => {
      if (
        state.isSidebarNavOpen &&
        ref_nav.current &&
        !ref_nav.current.contains(e.target)
      ) {
        closeSidebarNav();
      }
    };
    document.addEventListener("mousedown", outsideClickNav);

    return () => {
      document.removeEventListener("mousedown", outsideClickNav);
    };
  }, [state.isSidebarNavOpen]);
  useEffect(() => {
    const outsideClickBooks = (e) => {
      if (
        state.isSidebarBooksOpen &&
        ref_books.current &&
        !ref_books.current.contains(e.target)
      ) {
        closeSidebarBooks();
      }
    };
    document.addEventListener("mousedown", outsideClickBooks);

    return () => {
      document.removeEventListener("mousedown", outsideClickBooks);
    };
  }, [state.isSidebarBooksOpen]);
  useEffect(() => {
    const outsideClickAR = (e) => {
      if (
        state.isSidebarAROpen &&
        ref_ar.current &&
        !ref_ar.current.contains(e.target)
      ) {
        closeSidebarAR();
      }
    };
    document.addEventListener("mousedown", outsideClickAR);

    return () => {
      document.removeEventListener("mousedown", outsideClickAR);
    };
  }, [state.isSidebarAROpen]);

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
        ref_nav,
        ref_books,
        ref_ar
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
