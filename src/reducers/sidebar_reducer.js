import {
  SIDEBARNAV_CLOSE,
  SIDEBARNAV_OPEN,
  SIDEBAR_AUTHORS_CLOSE,
  SIDEBAR_AUTHORS_OPEN
} from "../actions/sidebar_actions";

const sidebar_reducer = (state, action) => {
  if (action.type === SIDEBARNAV_OPEN) {
    return { ...state, isSidebarNavOpen: true };
  }
  if (action.type === SIDEBARNAV_CLOSE) {
    return { ...state, isSidebarNavOpen: false };
  }
  if (action.type === SIDEBAR_AUTHORS_OPEN) {
    return { ...state, isSidebarAuthorsOpen: true };
  }
  if (action.type === SIDEBAR_AUTHORS_CLOSE) {
    return { ...state, isSidebarAuthorsOpen: false };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default sidebar_reducer;
