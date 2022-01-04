import {
  GET_ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_SINGLE_ITEM_START,
  GET_SINGLE_ITEM_SUCCESS,
  GET_SINGLE_ITEM_ERROR
} from "../actions/items_actions";

const giftshop_reducer = (state, action) => {
  if (action.type === GET_ITEMS_START) {
    return { ...state, gifts_loading: true };
  }
  if (action.type === GET_ITEMS_SUCCESS) {
    return { ...state, gifts_loading: false, gifts: action.payload };
  }
  if (action.type === GET_ITEMS_ERROR) {
    return { ...state, gifts_loading: false, gifts_error: true };
  }
  if (action.type === GET_SINGLE_ITEM_START) {
    return { ...state, single_gift_loading: true, single_gift_error: false };
  }
  if (action.type === GET_SINGLE_ITEM_ERROR) {
    return { ...state, single_gift_error: true, single_gift_loading: false };
  }
  if (action.type === GET_SINGLE_ITEM_SUCCESS) {
    return {
      ...state,
      single_gift_loading: false,
      single_gift_error: false,
      single_gift: action.payload
    };
  }

  throw new Error(`No matching "${action.type}" action`);
};

export default giftshop_reducer;
