import React, { useContext, useEffect, useReducer } from "react";

import axios from "axios";

import {
  SET_LOGIN_TRUE,
  SET_LOGIN_FALSE,
  UPDATE_USER,
  REMOVE_COOKIE_MODAL,
  SET_CLIENT_ENGAGED,
  RESET_USER
} from "../actions/authentication_actions";

import reducer from "../reducers/authentication_reducer";
import { useErrorReport } from "../hooks/useErrorReport";

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
  const errorReport = useErrorReport();
  const baseUrl = "/api/system/";
  const adminUrl = "/api/admin/";

  const login = () => {
    const url = `${adminUrl}login`;
    const method = "post";
    axios({
      url: url,
      method: method,
      data: { username: state.username, password: state.password }
    })
      .then((response) => {
        if (!response.data.auth) {
          dispatch({ type: SET_LOGIN_FALSE });
        } else {
          localStorage.setItem("token", response.data.token);
          dispatch({ type: SET_LOGIN_TRUE });
          dispatch({ type: RESET_USER });
        }
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const initialHeader = () => {
    return { "client-access-init": "crisinus-client-net" };
  };

  const handleCookiesModal = () => {
    const url = `${baseUrl}cookiesmodal`;
    const method = "get";
    axios({
      url: url,
      method: method
    }).catch((error) => {
      errorReport(error, url, window.location.pathname, method);
    });
    dispatch({ type: REMOVE_COOKIE_MODAL, payload: false });
  };

  const confirmCookiesModal = () => {
    const url = `${baseUrl}cookiesconfirm`;
    const method = "get";
    axios({
      url: url,
      method: method
    })
      .then((res) => {
        const response = JSON.parse(res.data.cookiesModal);
        dispatch({
          type: REMOVE_COOKIE_MODAL,
          payload: response
        });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const registerClient = () => {
    const url = `${baseUrl}client`;
    const method = "post";
    axios({
      url: url,
      method: method,
      headers: initialHeader()
    })
      .then((response) => {
        localStorage.setItem("client-token", response.data.clientToken);
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    const url = `${adminUrl}logout`;
    const method = "get";
    axios({
      url: url,
      method: method
    }).catch((error) => {
      errorReport(error, url, window.location.pathname, method);
    });
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
    // registerClient();
    const url = `${adminUrl}login`;
    const method = "get";
    axios({
      url: url,
      method: method
    })
      .then((response) => {
        if (response.data.loggedIn === true) {
          dispatch({ type: SET_LOGIN_TRUE });
        }
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
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
    if (axios.defaults.headers.common["client-access-token"] === undefined) {
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
        setAxiosInterceptor,
        registerClient
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => {
  return useContext(AuthenticationContext);
};
