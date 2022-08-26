import {
  LOAD_ARRAY,
  LOAD_INITIATED,
  ERROR_OCCURRED,
  LOAD_INFO,
  SET_IMAGES,
  UPDATE_VALUE
} from "../../actions/admin/info_actions";

const info_reducer = (state, action) => {
  if (action.type === LOAD_INITIATED) {
    return { ...state, loading: true, error: false };
  }

  if (action.type === ERROR_OCCURRED) {
    return { ...state, error: true, loading: false };
  }
  if (action.type === LOAD_ARRAY) {
    return {
      ...state,
      items: action.payload,
      loading: false,
      error: false
    };
  }

  if (action.type === LOAD_INFO) {
    return { ...state, item: action.payload, loading: false, error: false };
  }

  if (action.type === SET_IMAGES) {
    return { ...state, item: { ...state.item, images: action.payload } };
  }

  if (action.type === UPDATE_VALUE) {
    const { name, value } = action.payload;
    return { ...state, item: { ...state.item, [name]: value } };
  }

  throw new Error(`No matching ${action.type} action`);
};

export default info_reducer;
