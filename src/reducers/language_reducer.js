import { ERROR, SWITCH_LANGUAGE, SET_LANG } from "../actions/language_actions";

const language_reducer = (state, action) => {
  if (action.type === SWITCH_LANGUAGE) {
    const value = action.payload;

    return { ...state, current_language: value };
  }

  if (action.type === SET_LANG) {
    const lang = action.payload;
    return { ...state, translation: lang };
  }

  if (action.type === ERROR) {
    return { ...state, error: true };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default language_reducer;
