import {
    GET_ITEMS_START,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_ERROR,
    GET_SINGLE_ITEM_START,
    GET_SINGLE_BOOK_SUCCESS,
    GET_SINGLE_ITEM_ERROR,
    GET_SINGLE_ITEM_DONE,
    GET_SINGLE_GIFT_SUCCESS,
    GET_SINGLE_GIFT_ID,
    GET_SINGLE_BOOK_ID,
    GET_SINGLE_NEWS_ID,
    GET_ITEMS_DONE,
    UPDATE_SIZE,
    UPDATE_LENGTH,
    UPDATE_LENGTH_SEPARATE,
    CHANGE_NEWS_ID,
    SET_SINGLE_NEWS,
    SET_CONT_NAME_ERR_TRUE,
    SET_CONT_NAME_ERR_FALSE,
    SET_CONT_EMAIL_ERR_TRUE,
    SET_CONT_EMAIL_ERR_FALSE,
    UPDATE_CONTACT_FORM,
    SET_CONT_FORM_ERR_TRUE,
    SET_CONT_FORM_ERR_FALSE,
    RESET_CONTACT_FORM
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
            news: action.payload[2]
        };
    }
    if (action.type === GET_ITEMS_ERROR) {
        return { ...state, items_loading: false, items_error: true };
    }
    if (action.type === GET_ITEMS_DONE) {
        return { ...state, items_loading: false };
    }
    if (action.type === GET_SINGLE_ITEM_START) {
        return {
            ...state,
            single_item_loading: true,
            single_item_error: false
        };
    }
    if (action.type === GET_SINGLE_BOOK_ID) {
        const book = action.payload;
        return {
            ...state,
            single_book: book,
            single_item_loading: false,
            single_item_error: false
        };
    }
    // if (action.type === GET_SINGLE_NEWS_ID) {
    //   return { ...state, newsID: action.payload };
    // }
    if (action.type === GET_SINGLE_GIFT_ID) {
        const gift = action.payload;
        return {
            ...state,
            single_gift: gift,
            single_item_loading: false,
            single_item_error: false
        };
    }
    if (action.type === GET_SINGLE_ITEM_ERROR) {
        return {
            ...state,
            single_item_error: true,
            single_item_loading: false
        };
    }
    if (action.type === GET_SINGLE_BOOK_SUCCESS) {
        return {
            ...state,

            single_item_error: false,
            single_book: action.payload
        };
    }
    if (action.type === GET_SINGLE_GIFT_SUCCESS) {
        return {
            ...state,

            single_item_error: false,
            single_gift: action.payload
        };
    }
    if (action.type === GET_SINGLE_ITEM_DONE) {
        return { ...state, single_item_loading: false };
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
    if (action.type === CHANGE_NEWS_ID) {
        return { ...state, newsID: action.payload };
    }
    if (action.type === SET_SINGLE_NEWS) {
        const news = action.payload[0];
        const newsID = action.payload[1];
        const tempNews = news.find((item) => item.id === newsID);
        return { ...state, single_news: tempNews };
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
    throw new Error(`No matching "${action.type}" action`);
};

export default items_reducer;
