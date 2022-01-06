import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/language_reducer";
import { english, croatian } from "../languages/languages";

import { SWITCH_LANGUAGE, SET_LANG } from "../actions/language_actions";

const getLocalStorage = () => {
  let lang = localStorage.getItem("language");

  if (lang) {
    return JSON.parse(localStorage.getItem("language"));
  } else {
    return "HR";
  }
};

const initialState = {
  current_language: getLocalStorage(),
  error: false,
  languages: ["HR", "EN"],
  translation: {}
};

const LanguageContext = React.createContext();

export const LanguageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const switchLang = (e) => {
    let value = e.target.value;
    dispatch({ type: SWITCH_LANGUAGE, payload: value });
  };

  const translate = () => {
    if (state.current_language === "HR") {
      dispatch({ type: SET_LANG, payload: croatian });
    }
    if (state.current_language === "EN") {
      dispatch({ type: SET_LANG, payload: english });
    }
  };

  useEffect(() => {
    translate();
    localStorage.setItem("language", JSON.stringify(state.current_language));
  }, [state.current_language]);

  return (
    <LanguageContext.Provider value={{ ...state, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  return useContext(LanguageContext);
};
