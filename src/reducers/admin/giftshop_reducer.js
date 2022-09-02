import {
  UPDATE_VALUE,
  SET_IMAGES,
  LOAD_GIFT,
  LOAD_ARRAY,
  LOAD_INITIATED,
  ERROR_OCCURRED,
  ERROR_CLEARED
} from "../../actions/admin/giftshop_actions";

const giftshop_reducer = (state, action) => {
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
    return { ...state, gift: { ...state.gift, [name]: value } };
  }

  if (action.type === SET_IMAGES) {
    return { ...state, gift: { ...state.gift, images: action.payload } };
  }

  if (action.type === LOAD_GIFT) {
    return { ...state, gift: action.payload, loading: false, error: false };
  }

  if (action.type === LOAD_ARRAY) {
    return { ...state, gifts: action.payload, loading: false, error: false };
  }
  throw new Error(`No matching ${action.type} action`);
};

export default giftshop_reducer;
