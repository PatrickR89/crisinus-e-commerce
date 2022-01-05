import {
  GET_ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_SINGLE_ITEM_START,
  GET_SINGLE_ITEM_SUCCESS,
  GET_SINGLE_ITEM_ERROR,
  GET_ITEMS_DONE,
  GET_SINGLE_ITEM_DONE
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

  throw new Error(`No matching "${action.type}" action`);
};

export default items_reducer;
