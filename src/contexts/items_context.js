import React, {
    useContext,
    useEffect,
    useLayoutEffect,
    useReducer
} from "react";
import axios from "axios";
import reducer from "../reducers/items_reducer";
import {
    GET_ITEMS_START,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_ERROR,
    GET_SINGLE_ITEM_START,
    GET_SINGLE_ITEM_ERROR,
    GET_SINGLE_GIFT,
    GET_SINGLE_BOOK,
    UPDATE_SIZE,
    UPDATE_LENGTH,
    UPDATE_LENGTH_SEPARATE,
    SET_SINGLE_NEWS,
    SET_CONT_NAME_ERR_TRUE,
    SET_CONT_NAME_ERR_FALSE,
    SET_CONT_EMAIL_ERR_TRUE,
    SET_CONT_EMAIL_ERR_FALSE,
    UPDATE_CONTACT_FORM,
    SET_CONT_FORM_ERR_TRUE,
    SET_CONT_FORM_ERR_FALSE,
    RESET_CONTACT_FORM,
    FETCH_LINKS,
    FETCH_INFOPAGES
} from "../actions/items_actions";

import mockBooks from "../mockData/mockBooks";
import mockGifts from "../mockData/mockGifts";
import mockNews from "../mockData/mockNews";

const initialBook = mockBooks[0];
const initialGift = mockGifts[0];
const initialNews = mockNews[0];

const initialState = {
    items_loading: true,
    items_error: false,
    bookID: "i",
    giftID: "22",
    books: [],
    gifts: [],
    news: [],
    newsID: 1,
    newsPageID: 1,
    single_item_loading: true,
    single_item_error: false,
    single_book: initialBook,
    single_gift: initialGift,
    single_news: initialNews,
    screen_width: 0,
    home_page_items: 10,
    items_list_length: 8,
    informations: [],
    anchorLinks: [],
    contactForm: {
        values: {
            contactName: "",
            contactEmail: "",
            contactMessage: ""
        },
        errors: {
            contactNameError: true,
            contactEmailError: true
        },
        contactFormError: true
    },
    current_info: {}
};

const ItemsContext = React.createContext();

export const ItemsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // FETCH AND POPULATE REQUIRED ITEMS

    const fetchItems = async () => {
        dispatch({ type: GET_ITEMS_START });
        try {
            const axiosBooks = await axios.get("/api/public/books");
            const books = await axiosBooks.data;
            const axiosGifts = await axios.get("/api/public/gifts");
            const gifts = await axiosGifts.data;
            const axiosNews = await axios.get("/api/public/news");
            const news = await axiosNews.data;

            // const axiosInfo = await axios.get("/api/public/informations");
            // const infos = await axiosInfo.data;

            dispatch({
                type: GET_ITEMS_SUCCESS,
                payload: [books, gifts, news]
            });
        } catch (error) {
            const err = `api: api/public/{books/gifts/news/info} [itms_ctxt[GET]], error: ${error}`;

            axios.post("/api/system/error", { err });
            dispatch({ GET_ITEMS_ERROR });
        }
    };

    const fetchInfo = (pageName) => {
        dispatch({ type: GET_SINGLE_ITEM_START });
        axios
            .post("/api/public/informations", { pageName })
            .then((resp) => {
                const data = resp.data[0];
                console.log(data);
                dispatch({ type: FETCH_INFOPAGES, payload: data });
            })
            .catch((error) => {
                dispatch({ type: GET_SINGLE_ITEM_ERROR });

                const err = `api: /api/public/books [itms_ctxt[POST]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };

    const fetchSingleBook = (id) => {
        dispatch({ type: GET_SINGLE_ITEM_START });
        axios
            .post("/api/public/books", { id })
            .then((response) => {
                dispatch({
                    type: GET_SINGLE_BOOK,
                    payload: response.data
                });
            })
            .catch((error) => {
                dispatch({ type: GET_SINGLE_ITEM_ERROR });

                const err = `api: /api/public/books [itms_ctxt[POST]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };

    const fetchSingleGift = (id) => {
        dispatch({ type: GET_SINGLE_ITEM_START });
        axios
            .post("/api/public/gifts", { id })
            .then((response) => {
                dispatch({ type: GET_SINGLE_GIFT, payload: response.data[0] });
            })
            .catch((error) => {
                dispatch({ type: GET_SINGLE_ITEM_ERROR });

                const err = `api: /api/public/gifts [itms_ctxt[POST]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };

    const fetchSingleNews = (id) => {
        dispatch({ type: GET_SINGLE_ITEM_START });

        axios
            .post("/api/public/news", { id })
            .then((response) => {
                dispatch({
                    type: SET_SINGLE_NEWS,
                    payload: response.data[0]
                });
            })
            .catch((error) => {
                dispatch({ type: GET_SINGLE_ITEM_ERROR });

                const err = `api: /api/public/news [itms_ctxt[POST]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };

    const fetchLinks = () => {
        dispatch({ type: GET_SINGLE_ITEM_START });

        axios
            .get("/api/public/links")
            .then((resp) => {
                console.log(resp.data);
                if (resp.data !== "API is for client use only!") {
                    dispatch({ type: FETCH_LINKS, payload: resp.data });
                }
            })
            .catch((error) => {
                dispatch({ type: GET_ITEMS_ERROR });

                const err = `api: /api/public/links [itms_ctxt[POST]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };

    // FETCH AND POPULATE REQUIRED ITEMS END

    const updateSize = () => {
        dispatch({ type: UPDATE_SIZE, payload: window.innerWidth });
    };
    useEffect(() => {
        fetchItems();
    }, []);

    // CONTACT FORM

    const updateContactForm = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        dispatch({ type: UPDATE_CONTACT_FORM, payload: { name, value } });
    };

    function validateEmail(email) {
        var mailFormat =
            /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if (email.match(mailFormat)) {
            dispatch({ type: SET_CONT_EMAIL_ERR_FALSE });
        } else {
            dispatch({ type: SET_CONT_EMAIL_ERR_TRUE });
        }
    }

    useEffect(() => {
        if (state.contactForm.values.contactName === "") {
            dispatch({ type: SET_CONT_NAME_ERR_TRUE });
        } else {
            dispatch({ type: SET_CONT_NAME_ERR_FALSE });
        }
    }, [state.contactForm.values.contactName]);

    useEffect(() => {
        if (state.contactForm.values.contactEmail === "") {
            dispatch({ type: SET_CONT_EMAIL_ERR_TRUE });
        } else {
            validateEmail(state.contactForm.values.contactEmail);
        }
    }, [state.contactForm.values.contactEmail]);

    useEffect(() => {
        if (
            state.contactForm.errors.contactNameError ||
            state.contactForm.errors.contactEmailError ||
            state.contactForm.values.contactMessage === ""
        ) {
            dispatch({ type: SET_CONT_FORM_ERR_TRUE });
        } else {
            dispatch({ type: SET_CONT_FORM_ERR_FALSE });
        }
    }, [
        state.contactForm.errors.contactNameError,
        state.contactForm.errors.contactEmailError,
        state.contactForm.values.contactMessage
    ]);

    function submitContactForm() {
        const contactForm = state.contactForm.values;
        axios
            .post("/api/public/submitmessage", {
                contactForm
            })
            .then((response) => {
                dispatch({ type: RESET_CONTACT_FORM });
                return alert("Message sent");
            })
            .catch((error) => {
                dispatch({ type: GET_ITEMS_ERROR });
                console.log(error);

                const err = `api: /api/public/submitmessage [itms_ctxt[POST]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    }
    // CONTACT FORM END

    // WINDOW RESIZING EFFECT

    useLayoutEffect(() => {
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        if (state.screen_width > 1000) {
            dispatch({ type: UPDATE_LENGTH, payload: 10 });
            dispatch({ type: UPDATE_LENGTH_SEPARATE, payload: 8 });
        }
        if (state.screen_width < 1000) {
            dispatch({ type: UPDATE_LENGTH, payload: 6 });
            dispatch({ type: UPDATE_LENGTH_SEPARATE, payload: 6 });
        }
        if (state.screen_width < 650) {
            dispatch({ type: UPDATE_LENGTH, payload: 4 });
            dispatch({ type: UPDATE_LENGTH_SEPARATE, payload: 4 });
        }
    }, [state.screen_width]);

    // WINDOW RESIZING EFFECT END

    return (
        <ItemsContext.Provider
            value={{
                ...state,
                fetchSingleBook,
                fetchSingleGift,
                fetchSingleNews,
                fetchInfo,
                updateContactForm,
                submitContactForm,
                fetchLinks
            }}
        >
            {children}
        </ItemsContext.Provider>
    );
};

export const useItemsContext = () => {
    return useContext(ItemsContext);
};
