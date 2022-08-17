import React, { useContext, useEffect, useReducer } from "react";

import axios from "axios";

import {
    SET_LOGIN_TRUE,
    SET_LOGIN_FALSE,
    UPDATE_USER,
    REMOVE_COOKIE_MODAL,
    SET_CLIENT_ENGAGED
} from "../actions/authentication_actions";

import reducer from "../reducers/authentication_reducer";

const initialState = {
    username: "",
    password: "",
    loggedIn: false,
    cookiesModal: true,
    clientEngaged: false
};

const AuthenticationContext = React.createContext();

export const AuthenticationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const login = () => {
        axios
            .post("/api/login", {
                username: state.username,
                password: state.password
            })
            .then((response) => {
                if (!response.data.auth) {
                    dispatch({ type: SET_LOGIN_FALSE });
                } else {
                    localStorage.setItem("token", response.data.token);
                    dispatch({ type: SET_LOGIN_TRUE });
                }
            })
            .catch((error) => {
                const err = `api: /login/ [auth_ctxt[POST]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };

    const initialHeader = () => {
        return { "client-access-init": "crisinus-client-net" };
    };

    const handleCookiesModal = () => {
        axios.get("/api/system/cookiesmodal").catch((error) => {
            const err = `api: /system/cookiesmodal/ [auth_ctxt[GET]], error: ${error}`;
            axios.post("/api/system/error", { err });
        });
        dispatch({ type: REMOVE_COOKIE_MODAL, payload: false });
    };

    const confirmCookiesModal = () => {
        axios
            .get("/api/system/cookiesconfirm")
            .then((res) => {
                const response = JSON.parse(res.data.cookiesModal);
                dispatch({
                    type: REMOVE_COOKIE_MODAL,
                    payload: response
                });
            })
            .catch((error) => {
                const err = `api: /cookiesconfirm/ [auth_ctxt[GET]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };

    const registerClient = () => {
        axios
            .post("/api/system/client", {
                headers: initialHeader()
            })
            .then((response) => {
                localStorage.setItem("client-token", response.data.clientToken);
            });
    };

    const logout = () => {
        localStorage.removeItem("token");
        axios.get("/api/logout");
        dispatch({ type: SET_LOGIN_FALSE });
    };

    const updateUser = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        dispatch({ type: UPDATE_USER, payload: { name, value } });
    };

    const header = () => {
        return { "x-access-token": localStorage.getItem("token") };
    };

    const clientHeader = () => {
        return localStorage.getItem("client-token");
    };

    const clientReg = () => {
        registerClient();
        axios
            .get("/api/login")
            .then((response) => {
                if (response.data.loggedIn === true) {
                    dispatch({ type: SET_LOGIN_TRUE });
                }
            })
            .catch((error) => {
                const err = `api: /login/ [auth_ctxt[GET]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };

    const setAxiosInterceptor = () => {
        const instance = axios.create({
            baseURL: "/api"
        });

        instance.interceptors.request.use((request) => {
            const clientToken = localStorage.getItem("client-token");
            if (clientToken) {
                request.headers.common["client-access-token"] = clientToken;
            }
            return request;
        });
    };

    useEffect(() => {
        clientReg();
    }, []);

    useEffect(() => {
        confirmCookiesModal();
    }, [state.clientEngaged]);

    useEffect(() => {
        if (
            axios.defaults.headers.common["client-access-token"] === undefined
        ) {
            dispatch({ type: SET_CLIENT_ENGAGED, payload: false });
        } else {
            dispatch({ type: SET_CLIENT_ENGAGED, payload: true });
        }
    }, [axios.defaults.headers.common["client-access-token"]]);

    return (
        <AuthenticationContext.Provider
            value={{
                ...state,
                login,
                updateUser,
                header,
                logout,
                clientHeader,
                handleCookiesModal,
                clientReg,
                setAxiosInterceptor
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};

export const useAuthenticationContext = () => {
    return useContext(AuthenticationContext);
};
