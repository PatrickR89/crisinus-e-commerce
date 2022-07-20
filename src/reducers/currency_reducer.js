import {
    ERROR,
    CHANGE_CURRENCY,
    SET_EXCHANGE
} from "../actions/currency_actions";

const currency_reducer = (state, action) => {
    if (action.type === CHANGE_CURRENCY) {
        const value = action.payload;
        return { ...state, current_currency: value };
    }

    if (action.type === ERROR) {
        return { ...state, error: true };
    }

    if (action.type === SET_EXCHANGE) {
        return { ...state, euToKn: action.payload };
    }
    throw new Error(`No Matching "${action.type}" - action type`);
};

export default currency_reducer;
