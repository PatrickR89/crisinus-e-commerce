import {
  GET_ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_SINGLE_ITEM_START,
  GET_SINGLE_ITEM_SUCCESS,
  GET_SINGLE_ITEM_ERROR
} from "../actions/items_actions";

const books_reducer = (state, action) => {
  if (action.type === GET_ITEMS_START) {
    return { ...state, books_loading: true };
  }
  if (action.type === GET_ITEMS_SUCCESS) {
    return { ...state, books_loading: false, books: action.payload };
  }
  if (action.type === GET_ITEMS_ERROR) {
    return { ...state, books_loading: false, books_error: true };
  }
  if (action.type === GET_SINGLE_ITEM_START) {
    return { ...state, single_book_loading: true, single_book_error: false };
  }
  if (action.type === GET_SINGLE_ITEM_ERROR) {
    return { ...state, single_book_error: true, single_book_loading: false };
  }
  if (action.type === GET_SINGLE_ITEM_SUCCESS) {
    return {
      ...state,
      single_book_loading: false,
      single_book_error: false,
      single_book: action.payload
    };
  }

  throw new Error(`No matching "${action.type}" action`);
};

export default books_reducer;
