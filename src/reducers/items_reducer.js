import {
  GET_ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_SINGLE_ITEM_START,
  GET_SINGLE_ITEM_SUCCESS,
  GET_SINGLE_ITEM_ERROR,
  GET_ITEMS_DONE,
  GET_SINGLE_ITEM_DONE,
  UPDATE_SIZE,
  UPDATE_LENGTH,
  UPDATE_LENGTH_SEPARATE
} from "../actions/items_actions";

const items_reducer = (state, action) => {
  if (action.type === GET_ITEMS_START) {
    return { ...state, items_loading: true };
  }
  if (action.type === GET_ITEMS_SUCCESS) {
    return {
      ...state,

      books: action.payload[0],
      gifts: action.payload[1]
    };
  }
  if (action.type === GET_ITEMS_ERROR) {
    return { ...state, items_loading: false, items_error: true };
  }
  if (action.type === GET_ITEMS_DONE) {
    return { ...state, items_loading: false };
  }
  if (action.type === GET_SINGLE_ITEM_START) {
    return { ...state, single_item_loading: true, single_item_error: false };
  }
  if (action.type === GET_SINGLE_ITEM_ERROR) {
    return { ...state, single_item_error: true, single_item_loading: false };
  }
  if (action.type === GET_SINGLE_ITEM_SUCCESS) {
    return {
      ...state,

      single_item_error: false,
      single_item: action.payload
    };
  }
  if (action.type === GET_SINGLE_ITEM_DONE) {
    return { ...state, single_item_loading: false };
  }

  if (action.type === UPDATE_SIZE) {
    return { ...state, screen_width: action.payload };
  }
  if (action.type === UPDATE_LENGTH) {
    return { ...state, home_page_items: action.payload };
  }
  if (action.type === UPDATE_LENGTH_SEPARATE) {
    return { ...state, items_list_length: action.payload };
  }
  throw new Error(`No matching "${action.type}" action`);
};

export default items_reducer;
