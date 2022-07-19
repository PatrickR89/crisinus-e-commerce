import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import axios from "axios";
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
    SET_CL_POST_CODE_ERR_FALSE,
    SET_CART_ERROR_TRUE,
    SET_CART_ERROR_FALSE,
    RESET_CART
} from "../actions/cart_actions";

const getLocalStorage = () => {
    let cart = localStorage.getItem("cart");

    if (cart) {
        return JSON.parse(localStorage.getItem("cart"));
    } else {
        return [];
    }
};

const initialState = {
    cart: getLocalStorage(),
    total_items: 0,
    total_amount: 0,
    isModalOpen: false,
    cartOrder: {
        clientName: "",
        clientLastName: "",
        clientEmail: "",
        streetNumber: "",
        streetName: "",
        city: "",
        postalCode: 0
    },
    cartError: {
        clientNameError: true,
        clientLastNameError: true,
        clientEmailError: true,
        streetNumberError: true,
        streetNameError: true,
        cityError: true,
        postalCodeError: true
    },
    cartFinalError: true
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, amount, item) => {
        dispatch({ type: ADD_ITEM, payload: { id, amount, item } });
    };

    const removeItem = (id) => {
        dispatch({ type: REMOVE_ITEM, payload: id });
    };

    const clearCart = () => {
        dispatch({ type: CLEAR_CART });
    };

    const toggleAmount = (id, value) => {
        dispatch({ type: TOGGLE_ITEM_AMOUNT, payload: { id, value } });
    };

    const openModal = () => {
        dispatch({ type: OPEN_MODAL });
    };

    const closeModal = () => {
        dispatch({ type: CLOSE_MODAL });
    };

    const updateClient = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        dispatch({ type: UPDATE_CLIENT, payload: { name, value } });
    };

    function submitCart() {
        const cart = state.cart;
        const cartOrder = state.cartOrder;
        const totalAmount = state.total_amount;

        axios
            .post("/public/submitcart", {
                cart,
                cartOrder,
                totalAmount
            })
            .then((response) => {
                dispatch({ type: RESET_CART });
                dispatch({ type: CLOSE_MODAL });
                return alert(response.data);
            })
            .catch((err) => {
                axios.post("/system/error", { err });
            });
    }

    // CART VALIDATION

    function validateEmail(email) {
        var mailFormat =
            /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if (email.match(mailFormat)) {
            dispatch({ type: SET_CL_EMAIL_ERR_FALSE });
        } else {
            dispatch({ type: SET_CL_EMAIL_ERR_TRUE });
        }
    }

    useEffect(() => {
        if (state.cartOrder.clientName === "") {
            dispatch({ type: SET_CL_NAME_ERR_TRUE });
        } else {
            dispatch({ type: SET_CL_NAME_ERR_FALSE });
        }
    }, [state.cartOrder.clientName]);

    useEffect(() => {
        if (state.cartOrder.clientLastName === "") {
            dispatch({ type: SET_CL_LASTNAME_ERR_TRUE });
        } else {
            dispatch({ type: SET_CL_LASTNAME_ERR_FALSE });
        }
    }, [state.cartOrder.clientLastName]);

    useEffect(() => {
        if (state.cartOrder.clientEmail === "") {
            dispatch({ type: SET_CL_EMAIL_ERR_TRUE });
        } else {
            validateEmail(state.cartOrder.clientEmail);
        }
    }, [state.cartOrder.clientEmail]);

    useEffect(() => {
        if (state.cartOrder.streetNumber === "") {
            dispatch({ type: SET_CL_ST_NUM_ERR_TRUE });
        } else {
            dispatch({ type: SET_CL_ST_NUM_ERR_FALSE });
        }
    }, [state.cartOrder.streetNumber]);

    useEffect(() => {
        if (state.cartOrder.streetName === "") {
            dispatch({ type: SET_CL_ST_NAME_ERR_TRUE });
        } else {
            dispatch({ type: SET_CL_ST_NAME_ERR_FALSE });
        }
    }, [state.cartOrder.streetName]);

    useEffect(() => {
        if (state.cartOrder.city === "") {
            dispatch({ type: SET_CL_CITY_ERR_TRUE });
        } else {
            dispatch({ type: SET_CL_CITY_ERR_FALSE });
        }
    }, [state.cartOrder.city]);

    useEffect(() => {
        if (state.cartOrder.postalCode === 0) {
            dispatch({ type: SET_CL_POST_CODE_ERR_TRUE });
        } else {
            dispatch({ type: SET_CL_POST_CODE_ERR_FALSE });
        }
    }, [state.cartOrder.postalCode]);

    useEffect(() => {
        if (
            state.cartError.clientNameError ||
            state.cartError.clientLastNameError ||
            state.cartError.clientEmailError ||
            state.cartError.streetNameError ||
            state.cartError.streetNumberError ||
            state.cartError.cityError ||
            state.cartError.postalCodeError
        ) {
            dispatch({ type: SET_CART_ERROR_TRUE });
        } else {
            dispatch({ type: SET_CART_ERROR_FALSE });
        }
    }, [state.cartError]);

    //  CART VALIDATION END

    useEffect(() => {
        dispatch({ type: COUNT_TOTALS });
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }, [state.cart]);

    return (
        <CartContext.Provider
            value={{
                ...state,
                addToCart,
                removeItem,
                clearCart,
                toggleAmount,
                openModal,
                closeModal,
                updateClient,
                submitCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(CartContext);
};
