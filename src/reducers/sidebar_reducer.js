import { SIDEBARNAV_CLOSE, SIDEBARNAV_OPEN } from "../actions/sidebar_actions";

const sidebar_reducer = (state, action) => {
  if (action.type === SIDEBARNAV_OPEN) {
    return { ...state, isSidebarNavOpen: true };
  }
  if (action.type === SIDEBARNAV_CLOSE) {
    return { ...state, isSidebarNavOpen: false };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default sidebar_reducer;
