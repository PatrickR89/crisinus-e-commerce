import {
  FETCH_MESSAGE,
  FETCH_MESSAGES,
  FETCH_ORDER,
  FETCH_ORDERS,
  LOAD_INITIATED,
  ERROR_OCCURRED,
  OPEN_MODAL,
  CLOSE_MODAL
} from "../../actions/admin/clients_actions";

const clients_reducer = (state, action) => {
  if (action.type === LOAD_INITIATED) {
    return { ...state, loading: true, error: false };
  }

  if (action.type === ERROR_OCCURRED) {
    return { ...state, error: true, loading: false };
  }

  if (action.type === FETCH_MESSAGES) {
    return { ...state, messages: action.payload, loading: false, error: false };
  }

  if (action.type === FETCH_MESSAGE) {
    return { ...state, message: action.payload, loading: false, error: false };
  }

  if (action.type === OPEN_MODAL) {
    return { ...state, isModal: true };
  }

  if (action.type === CLOSE_MODAL) {
    return { ...state, isModal: false };
  }
  throw new Error(`No matching ${action.type} action`);
};

export default clients_reducer;
