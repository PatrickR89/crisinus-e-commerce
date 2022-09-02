import {
  FETCH_MESSAGE,
  FETCH_MESSAGES,
  FETCH_ORDER,
  FETCH_ORDERS,
  LOAD_INITIATED,
  ERROR_OCCURRED,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_ORDER_STATUS,
  TOGGLE_ORDER_MODAL,
  ERROR_CLEARED
} from "../../actions/admin/clients_actions";

const clients_reducer = (state, action) => {
  if (action.type === LOAD_INITIATED) {
    return { ...state, loading: true, error: false };
  }

  if (action.type === ERROR_OCCURRED) {
    return { ...state, error: true, loading: false };
  }

  if (action.type === ERROR_CLEARED) {
    return { ...state, error: false, loading: false };
  }

  if (action.type === FETCH_MESSAGES) {
    return { ...state, messages: action.payload, loading: false, error: false };
  }

  if (action.type === FETCH_MESSAGE) {
    return { ...state, message: action.payload, loading: false, error: false };
  }

  if (action.type === OPEN_MODAL) {
    return { ...state, isModal: true };
  }

  if (action.type === CLOSE_MODAL) {
    return { ...state, isModal: false };
  }

  if (action.type === FETCH_ORDERS) {
    return {
      ...state,
      orderPage: { ...state.orderPage, orderList: action.payload },
      loading: false,
      error: false
    };
  }

  if (action.type === FETCH_ORDER) {
    const data = action.payload;
    const parsedOrder = JSON.parse(data.product_order);
    const order = parsedOrder.cartOrder;
    const cart = parsedOrder.cart;
    const totalAmount = parsedOrder.totalAmount;
    const status = data.order_status;

    return {
      ...state,
      orderPage: {
        ...state.orderPage,
        order: order,
        cart: cart,
        totalAmount: totalAmount,
        status: status
      },
      loading: false,
      error: false
    };
  }

  if (action.type === SET_ORDER_STATUS) {
    return {
      ...state,
      orderPage: { ...state.orderPage, status: action.payload }
    };
  }

  if (action.type === TOGGLE_ORDER_MODAL) {
    const changed = action.payload;
    console.log(changed);
    return {
      ...state,
      orderPage: { ...state.orderPage, isModal: !changed }
    };
  }
  throw new Error(`No matching ${action.type} action`);
};

export default clients_reducer;
