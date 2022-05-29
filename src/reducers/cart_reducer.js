import {
  ADD_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_TOTALS,
  OPEN_MODAL,
  CLOSE_MODAL
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

  throw new Error(`No matshing "${action.type}" action type`);
};

export default cart_reducer;
