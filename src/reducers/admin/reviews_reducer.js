import {
  UPDATE_VALUE,
  LOAD_VALUE,
  LOAD_ARRAY,
  LOAD_INITIATED,
  ERROR_OCCURRED,
  LOAD_SECONDARY_ARRAY
} from "../../actions/admin/reviews_actions";

const reviews_reducer = (state, action) => {
  if (action.type === LOAD_INITIATED) {
    return { ...state, loading: true, error: false };
  }

  if (action.type === ERROR_OCCURRED) {
    return { ...state, error: true, loading: false };
  }
  if (action.type === UPDATE_VALUE) {
    const { name, value } = action.payload;
    return { ...state, review: { ...state.review, [name]: value } };
  }

  if (action.type === LOAD_VALUE) {
    let review = action.payload;
    review.book = review.book_id;
    return { ...state, review: review, loading: false, error: false };
  }

  if (action.type === LOAD_SECONDARY_ARRAY) {
    return { ...state, books: action.payload, loading: false, error: false };
  }

  if (action.type === LOAD_ARRAY) {
    return {
      ...state,
      reviews: action.payload,
      loading: false,
      error: false
    };
  }
  throw new Error(`No matching ${action.type} action`);
};

export default reviews_reducer;
