import {
  SIDEBARNAV_CLOSE,
  SIDEBARNAV_OPEN,
  SIDEBAR_BOOKS_CLOSE,
  SIDEBAR_BOOKS_OPEN
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

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default sidebar_reducer;
