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
  GET_ITEMS_DONE,
  GET_SINGLE_ITEM_START,
  GET_SINGLE_BOOK_SUCCESS,
  GET_SINGLE_ITEM_ERROR,
  GET_SINGLE_ITEM_DONE,
  GET_SINGLE_GIFT_SUCCESS,
  GET_SINGLE_GIFT_ID,
  GET_SINGLE_BOOK_ID,
  GET_SINGLE_NEWS_ID,
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

import mockBooks from "../mockData/mockBooks";
import mockGifts from "../mockData/mockGifts";
import mockNews from "../mockData/mockNews";

const initialBook = mockBooks[0];
const initialGift = mockGifts[0];
const initialNews = mockNews[0];

const initialState = {
  items_loading: true,
  items_error: false,
  bookID: 1,
  giftID: 51,
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
  }
};

const ItemsContext = React.createContext();

export const ItemsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchItems = async () => {
    dispatch({ type: GET_ITEMS_START });
    try {
      const aBooks = await axios.get("http://localhost:3001/public/books");
      const books = await aBooks.data;
      console.log(books);
      // const books = await mockBooks;

      const gifts = await mockGifts;
      const news = await mockNews;
      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: [books, gifts, news]
      });
      setTimeout(() => {
        dispatch({ type: GET_ITEMS_DONE });
      }, 300);
    } catch (error) {
      dispatch({ GET_ITEMS_ERROR });
    }
  };

  const fetchSingleBook = (id) => {
    dispatch({ type: GET_SINGLE_ITEM_START });
    dispatch({ type: GET_SINGLE_BOOK_ID, payload: id });
  };

  const fetchSingleGift = (id) => {
    dispatch({ type: GET_SINGLE_ITEM_START });
    dispatch({ type: GET_SINGLE_GIFT_ID, payload: id });
  };
  const changeNews = (id) => {
    dispatch({ type: GET_SINGLE_ITEM_START });
    dispatch({ type: CHANGE_NEWS_ID, payload: id });
  };

  const updateSize = () => {
    dispatch({ type: UPDATE_SIZE, payload: window.innerWidth });
  };
  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const singleBook = state.books.find(
      (book) => book.id === parseInt(state.bookID)
    );
    if (state.books.length) {
      dispatch({ type: GET_SINGLE_BOOK_SUCCESS, payload: singleBook });
    } else {
      fetchItems();
    }

    const timeoutBook = setTimeout(() => {
      dispatch({ type: GET_SINGLE_ITEM_DONE });
    }, 800);
    return () => clearTimeout(timeoutBook);
  }, [state.books, state.bookID]);

  useEffect(() => {
    const singleGift = state.gifts.find(
      (gift) => gift.id === parseInt(state.giftID)
    );
    if (state.gifts.length) {
      dispatch({ type: GET_SINGLE_GIFT_SUCCESS, payload: singleGift });
    } else {
      fetchItems();
    }

    setTimeout(() => {
      dispatch({ type: GET_SINGLE_ITEM_DONE });
    }, 500);
  }, [state.giftID, state.gifts]);

  useEffect(() => {
    if (state.news.length) {
      dispatch({ type: SET_SINGLE_NEWS, payload: [state.news, state.newsID] });
    } else {
      fetchItems();
    }
    return () => {
      dispatch({ type: GET_SINGLE_ITEM_DONE });
    };
  }, [state.newsID, state.news]);

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
    try {
      axios
        .post("http://localhost:3001/public/submitmessage", {
          contactForm
        })
        .then((response) => {
          dispatch({ type: RESET_CONTACT_FORM });
          return alert(response.data);
        });
    } catch (err) {
      console.log(err);
    }
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
        changeNews,
        updateContactForm,
        submitContactForm
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const useItemsContext = () => {
  return useContext(ItemsContext);
};
