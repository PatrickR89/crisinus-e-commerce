import axios from "axios";
import {
  GET_ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_SINGLE_ITEM_START,
  GET_SINGLE_ITEM_ERROR,
  GET_SINGLE_GIFT,
  GET_SINGLE_BOOK,
  FETCH_LINKS,
  UPDATE_SIZE,
  UPDATE_LENGTH,
  UPDATE_LENGTH_SEPARATE,
  UPDATE_NEWS_LENGTH,
  SET_SINGLE_NEWS,
  SET_CONT_NAME_ERR_TRUE,
  SET_CONT_NAME_ERR_FALSE,
  SET_CONT_EMAIL_ERR_TRUE,
  SET_CONT_EMAIL_ERR_FALSE,
  UPDATE_CONTACT_FORM,
  SET_CONT_FORM_ERR_TRUE,
  SET_CONT_FORM_ERR_FALSE,
  RESET_CONTACT_FORM,
  FETCH_INFOPAGES,
  GET_ITEM_DIMENSIONS,
  GET_BOOK_PROPERTIES
} from "../actions/items_actions";

const items_reducer = (state, action) => {
  if (action.type === GET_ITEMS_START) {
    return { ...state, items_loading: true };
  }
  if (action.type === GET_ITEMS_SUCCESS) {
    return {
      ...state,

      books: action.payload[0],
      gifts: action.payload[1],
      news: action.payload[2],
      items_loading: false,
      items_error: false
    };
  }
  if (action.type === GET_ITEMS_ERROR) {
    return { ...state, items_loading: false, items_error: true };
  }
  if (action.type === GET_SINGLE_ITEM_START) {
    return {
      ...state,
      single_item_loading: true,
      single_item_error: false
    };
  }
  if (action.type === GET_SINGLE_BOOK) {
    const book = action.payload;
    return {
      ...state,
      single_book: book,
      single_item_loading: false,
      single_item_error: false
    };
  }
  if (action.type === FETCH_LINKS) {
    return {
      ...state,
      anchorLinks: action.payload,
      items_loading: false,
      items_error: false
    };
  }
  if (action.type === GET_SINGLE_GIFT) {
    const gift = action.payload;
    return {
      ...state,
      single_gift: gift,
      single_item_loading: false,
      single_item_error: false
    };
  }
  if (action.type === SET_SINGLE_NEWS) {
    const news = action.payload;
    return {
      ...state,
      single_news: news,
      single_item_error: false,
      single_item_loading: false
    };
  }
  if (action.type === GET_SINGLE_ITEM_ERROR) {
    return {
      ...state,
      single_item_error: true,
      single_item_loading: false
    };
  }

  if (action.type === FETCH_INFOPAGES) {
    return {
      ...state,
      current_info: action.payload,
      single_item_error: false,
      single_item_loading: false
    };
  }
  if (action.type === UPDATE_SIZE) {
    return { ...state, screen_width: action.payload };
  }
  if (action.type === UPDATE_LENGTH) {
    return { ...state, home_page_items: action.payload };
  }
  if (action.type === UPDATE_LENGTH_SEPARATE) {
    return { ...state, items_list_length: action.payload };
  }

  if (action.type === UPDATE_NEWS_LENGTH) {
    return {
      ...state,
      news_display: {
        ...state.news_display,
        news_length: action.payload[0],
        news_heigth: action.payload[1],
        news_title: action.payload[2],
        news_width: action.payload[3]
      }
    };
  }

  if (action.type === GET_ITEM_DIMENSIONS) {
    return { ...state, item_dimensions: action.payload };
  }

  if (action.type === GET_BOOK_PROPERTIES) {
    return { ...state, book_properties: action.payload };
  }
  if (action.type === UPDATE_CONTACT_FORM) {
    const { name, value } = action.payload;
    return {
      ...state,
      contactForm: {
        ...state.contactForm,
        values: { ...state.contactForm.values, [name]: value }
      }
    };
  }
  if (action.type === SET_CONT_NAME_ERR_TRUE) {
    return {
      ...state,
      contactForm: {
        ...state.contactForm,
        errors: { ...state.contactForm.errors, contactNameError: true }
      }
    };
  }
  if (action.type === SET_CONT_NAME_ERR_FALSE) {
    return {
      ...state,
      contactForm: {
        ...state.contactForm,
        errors: { ...state.contactForm.errors, contactNameError: false }
      }
    };
  }
  if (action.type === SET_CONT_EMAIL_ERR_TRUE) {
    return {
      ...state,
      contactForm: {
        ...state.contactForm,
        errors: { ...state.contactForm.errors, contactEmailError: true }
      }
    };
  }
  if (action.type === SET_CONT_EMAIL_ERR_FALSE) {
    return {
      ...state,
      contactForm: {
        ...state.contactForm,
        errors: {
          ...state.contactForm.errors,
          contactEmailError: false
        }
      }
    };
  }
  if (action.type === SET_CONT_FORM_ERR_TRUE) {
    return {
      ...state,
      contactForm: {
        ...state.contactForm,
        contactFormError: true
      }
    };
  }
  if (action.type === SET_CONT_FORM_ERR_FALSE) {
    return {
      ...state,
      contactForm: {
        ...state.contactForm,
        contactFormError: false
      }
    };
  }
  if (action.type === RESET_CONTACT_FORM) {
    return {
      ...state,
      contactForm: {
        ...state.contactForm,
        values: {
          contactName: "",
          contactEmail: "",
          contactMessage: ""
        }
      }
    };
  }
  const err = [`Error occured in items reducer with action type`, action];
  axios.post("/api/system/error", { err });
  throw new Error(`No matching "${action.type}" in ${action} action`);
};

export default items_reducer;
