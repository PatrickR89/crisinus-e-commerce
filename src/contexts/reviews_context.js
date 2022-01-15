import React, { useContext, useEffect, useReducer } from "react";

import reducer from "../reducers/reviews_reducer";

import {
  SET_BOOK_IDS,
  SET_BOOK_LIST,
  LOADING_START,
  LOADING_END,
  SET_CURRENT_BOOK,
  SET_REVIEWS_PER_BOOK,
  SET_CURRENT_BOOK_OBJ
} from "../actions/reviews_actions";

import mockReviews from "../mockData/mockReviews";
import { useItemsContext } from "../contexts/items_context";

const initialState = {
  bookIds: [],
  bookList: [],
  reviewsPerBook: [],
  currentBook: 0,
  currentBookObject: {},
  isLoading: true
};

const ReviewsContext = React.createContext();

export const ReviewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { books } = useItemsContext();

  useEffect(() => {
    dispatch({ type: SET_BOOK_IDS, payload: mockReviews });
  }, []);

  useEffect(() => {
    dispatch({ type: SET_BOOK_LIST, payload: [state.bookIds, books] });
  }, [state.bookIds, books]);

  const switchBook = (id) => {
    dispatch({ type: LOADING_START });
    dispatch({ type: SET_CURRENT_BOOK, payload: id });
  };

  const bookReviews = (id) => {
    return mockReviews.filter((review) => review.bookId === id);
  };
  const getTitle = (id) => {
    return books.find((book) => book.id === id);
  };

  useEffect(() => {
    const findReviews = bookReviews(state.currentBook);
    const chosen = getTitle(state.currentBook);
    dispatch({ type: SET_REVIEWS_PER_BOOK, payload: findReviews });
    dispatch({ type: SET_CURRENT_BOOK_OBJ, payload: chosen });
    setTimeout(() => {
      dispatch({ type: LOADING_END });
    }, 300);
  }, [state.currentBook]);

  return (
    <ReviewsContext.Provider value={{ ...state, switchBook }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviewsContext = () => {
  return useContext(ReviewsContext);
};
