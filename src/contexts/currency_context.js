import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/currency_reducer";
import axios from "axios";
import { CHANGE_CURRENCY, SET_EXCHANGE } from "../actions/currency_actions";

const getLocalStorage = () => {
    let currency = localStorage.getItem("currency");

    if (currency) {
        return JSON.parse(localStorage.getItem("currency"));
    } else {
        return "HRK";
    }
};

const initialState = {
    current_currency: getLocalStorage(),
    error: false,
    euToKn: 7.513562,
    currencies: ["HRK", "EUR"]
};

const CurrencyContext = React.createContext();

export const CurrencyProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const updateCurrency = (e) => {
        let value = e.target.value;
        dispatch({ type: CHANGE_CURRENCY, payload: value });
    };

    const formatPriceHrk = (number) => {
        const newNumber = Intl.NumberFormat("hr-HR", {
            style: "currency",
            currency: "hrk"
        }).format(number / 100);
        return newNumber;
    };

    const formatPriceEur = (number) => {
        const inEur = (number / 100 / state.euToKn).toFixed(2);
        const newNumber = Intl.NumberFormat("eu-EU", {
            style: "currency",
            currency: "eur"
        }).format(inEur);
        return newNumber;
    };
    const priceFormat = (number) => {
        if (state.current_currency === "HRK") {
            return formatPriceHrk(number);
        }
        if (state.current_currency === "EUR") {
            return formatPriceEur(number);
        }
    };

    function setEuro() {
        axios
            .get("/system/currency")
            .then((resp) => {
                dispatch({ type: SET_EXCHANGE, payload: resp.data });
            })
            .catch((err) => {
                axios.post("/system/error", { err });
            });
    }

    useEffect(() => {
        setEuro();
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "currency",
            JSON.stringify(state.current_currency)
        );
    }, [state.current_currency]);

    return (
        <CurrencyContext.Provider
            value={{ ...state, updateCurrency, priceFormat }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrencyContext = () => {
    return useContext(CurrencyContext);
};
