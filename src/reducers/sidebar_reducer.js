import {
  SIDEBARNAV_CLOSE,
  SIDEBARNAV_OPEN,
  SIDEBAR_BOOKS_CLOSE,
  SIDEBAR_BOOKS_OPEN,
  SIDEBAR_AR_OPEN,
  SIDEBAR_AR_CLOSE
} from "../actions/sidebar_actions";

const sidebar_reducer = (state, action) => {
  if (action.type === SIDEBARNAV_OPEN) {
    return { ...state, isSidebarNavOpen: true };
  }
  if (action.type === SIDEBARNAV_CLOSE) {
    return { ...state, isSidebarNavOpen: false };
  }
  if (action.type === SIDEBAR_BOOKS_OPEN) {
    return { ...state, isSidebarBooksOpen: true };
  }
  if (action.type === SIDEBAR_BOOKS_CLOSE) {
    return { ...state, isSidebarBooksOpen: false };
  }
  if (action.type === SIDEBAR_AR_OPEN) {
    return { ...state, isSidebarAROpen: true };
  }
  if (action.type === SIDEBAR_AR_CLOSE) {
    return { ...state, isSidebarAROpen: false };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default sidebar_reducer;
