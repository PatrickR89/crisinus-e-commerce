import {
  UPDATE_VALUE,
  SET_IMAGES,
  LOAD_VALUE,
  LOAD_ARRAY,
  LOAD_INITIATED,
  ERROR_OCCURRED,
  ERROR_CLEARED
} from "../../actions/admin/news_actions";

const news_reducer = (state, action) => {
  if (action.type === LOAD_INITIATED) {
    return { ...state, loading: true, error: false };
  }

  if (action.type === ERROR_OCCURRED) {
    return { ...state, error: true, loading: false };
  }

  if (action.type === ERROR_CLEARED) {
    return { ...state, error: false, loading: false };
  }

  if (action.type === UPDATE_VALUE) {
    const { name, value } = action.payload;
    return { ...state, news: { ...state.news, [name]: value } };
  }

  if (action.type === SET_IMAGES) {
    return { ...state, news: { ...state.news, images: action.payload } };
  }

  if (action.type === LOAD_VALUE) {
    return { ...state, news: action.payload, loading: false, error: false };
  }

  if (action.type === LOAD_ARRAY) {
    return { ...state, newsList: action.payload, loading: false, error: false };
  }
  throw new Error(`No matching ${action.type} action`);
};

export default news_reducer;
