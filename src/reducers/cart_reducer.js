import {
  ADD_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_TOTALS,
  OPEN_MODAL,
  CLOSE_MODAL,
  UPDATE_CLIENT,
  SET_CL_NAME_ERR_TRUE,
  SET_CL_NAME_ERR_FALSE,
  SET_CL_LASTNAME_ERR_TRUE,
  SET_CL_LASTNAME_ERR_FALSE,
  SET_CL_EMAIL_ERR_TRUE,
  SET_CL_EMAIL_ERR_FALSE,
  SET_CL_ST_NUM_ERR_TRUE,
  SET_CL_ST_NUM_ERR_FALSE,
  SET_CL_ST_NAME_ERR_TRUE,
  SET_CL_ST_NAME_ERR_FALSE,
  SET_CL_CITY_ERR_TRUE,
  SET_CL_CITY_ERR_FALSE,
  SET_CL_POST_CODE_ERR_TRUE,
  SET_CL_POST_CODE_ERR_FALSE
} from "../actions/cart_actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_ITEM) {
    const { id, amount, item } = action.payload;
    const tempItem = state.cart.find((i) => i.id === id);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if ((cartItem.id = id)) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id,
        name: item.name,
        title: item.title,
        amount,
        image: item.images[0],
        price: item.price,
        max: item.stock
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  if (action.type === REMOVE_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === TOGGLE_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });
    return { ...state, cart: tempCart };
  }

  if (action.type === COUNT_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.toal_items += amount;
        total.total_amount += price * amount;

        return total;
      },
      {
        total_items: 0,
        total_amount: 0
      }
    );
    return { ...state, total_amount, total_items };
  }

  if (action.type === OPEN_MODAL) {
    return { ...state, isModalOpen: true };
  }

  if (action.type === CLOSE_MODAL) {
    return { ...state, isModalOpen: false };
  }

  if (action.type === UPDATE_CLIENT) {
    const { name, value } = action.payload;
    return { ...state, cartOrder: { ...state.cartOrder, [name]: value } };
  }

  //CLIENT VALIDATION
  if (action.type === SET_CL_NAME_ERR_TRUE) {
    return {
      ...state,
      cartError: { ...state.cartError, clientNameError: true }
    };
  }
  if (action.type === SET_CL_NAME_ERR_FALSE) {
    return {
      ...state,
      cartError: { ...state.cartError, clientNameError: false }
    };
  }
  if (action.type === SET_CL_LASTNAME_ERR_TRUE) {
    return {
      ...state,
      cartError: { ...state.cartError, clientLastNameError: true }
    };
  }
  if (action.type === SET_CL_LASTNAME_ERR_FALSE) {
    return {
      ...state,
      cartError: { ...state.cartError, clientLastNameError: false }
    };
  }
  if (action.type === SET_CL_EMAIL_ERR_TRUE) {
    return {
      ...state,
      cartError: { ...state.cartError, clientEmailError: true }
    };
  }
  if (action.type === SET_CL_EMAIL_ERR_FALSE) {
    return {
      ...state,
      cartError: { ...state.cartError, clientEmailError: false }
    };
  }
  if (action.type === SET_CL_ST_NUM_ERR_TRUE) {
    return {
      ...state,
      cartError: { ...state.cartError, streetNumberError: true }
    };
  }
  if (action.type === SET_CL_ST_NUM_ERR_FALSE) {
    return {
      ...state,
      cartError: { ...state.cartError, streetNumberError: false }
    };
  }
  if (action.type === SET_CL_ST_NAME_ERR_TRUE) {
    return {
      ...state,
      cartError: { ...state.cartError, streetNameError: true }
    };
  }
  if (action.type === SET_CL_ST_NAME_ERR_FALSE) {
    return {
      ...state,
      cartError: { ...state.cartError, streetNameError: false }
    };
  }
  if (action.type === SET_CL_CITY_ERR_TRUE) {
    return {
      ...state,
      cartError: { ...state.cartError, cityError: true }
    };
  }
  if (action.type === SET_CL_CITY_ERR_FALSE) {
    return {
      ...state,
      cartError: { ...state.cartError, cityError: false }
    };
  }
  if (action.type === SET_CL_POST_CODE_ERR_TRUE) {
    return {
      ...state,
      cartError: { ...state.cartError, postalCodeError: true }
    };
  }
  if (action.type === SET_CL_POST_CODE_ERR_FALSE) {
    return {
      ...state,
      cartError: { ...state.cartError, postalCodeError: false }
    };
  }

  // CLIENT VALIDATION END
  throw new Error(`No matshing "${action.type}" action type`);
};

export default cart_reducer;
