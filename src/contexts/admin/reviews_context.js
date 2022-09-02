import React, { useContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  UPDATE_VALUE,
  LOAD_VALUE,
  LOAD_ARRAY,
  LOAD_INITIATED,
  ERROR_OCCURRED,
  LOAD_SECONDARY_ARRAY
} from "../../actions/admin/reviews_actions";

import reducer from "../../reducers/admin/reviews_reducer";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useErrorReport } from "../../hooks/useErrorReport";

const initialState = {
  loading: false,
  error: false,
  reviews: [],
  review: {
    book_id: "",
    book_title: "",
    rating_title: "",
    rating: 0,
    reviewer: "",
    review: "",
    book: {}
  },
  books: []
};

const ReviewsContext = React.createContext();

export const ReviewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const checkAuth = useCheckAuth();
  const errorReport = useErrorReport();
  const baseUrl = "/api/reviews/";

  const resetForm = () => {
    const review = {
      book_id: "",
      book_title: "",
      rating_title: "",
      rating: 0,
      reviewer: "",
      review: "",
      book: {}
    };
    dispatch({
      type: LOAD_VALUE,
      payload: review
    });
  };

  const updateValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (value === undefined || value === null) {
      value = "";
    }

    dispatch({ type: UPDATE_VALUE, payload: { name, value } });
  };

  const getReviews = () => {
    dispatch({ type: LOAD_INITIATED });
    const url = `${baseUrl}`;
    const method = "get";
    axios({
      url: url,
      method: method
    })
      .then((response) => {
        dispatch({ type: LOAD_ARRAY, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const loadBooks = () => {
    dispatch({ type: LOAD_INITIATED });
    const url = `/api/books/`;
    const method = "get";
    axios({
      url: url,
      method: method
    })
      .then((response) => {
        dispatch({ type: LOAD_SECONDARY_ARRAY, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const addReview = (header) => {
    const { book, rating_title, rating, reviewer, review } = state.review;
    const url = `${baseUrl}`;
    const method = "post";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { book, rating_title, rating, reviewer, review }
    })
      .then((response) => {
        checkAuth(response);
        const info = `${rating_title} rating added`;
        axios.post("/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });

    navigate("/admin/reviews/list", { replace: true });
  };

  const findById = (header, id) => {
    const url = `${baseUrl}${id}`;
    const method = "post";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id }
    })
      .then((response) => {
        checkAuth(response);
        dispatch({ type: LOAD_VALUE, payload: response.data });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const editById = (header, id) => {
    const { book, rating_title, rating, review, reviewer } = state.review;
    const url = `${baseUrl}${id}`;
    const method = "put";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id, book, rating_title, rating, reviewer, review }
    })
      .then((response) => {
        checkAuth(response);
        const info = `${id} rating edited`;
        axios.post("/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });

    navigate("/admin/reviews/list", { replace: true });
  };

  const deleteById = (header, id) => {
    const url = `${baseUrl}${id}`;
    const method = "delete";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id: id }
    })
      .then((response) => {
        checkAuth(response);
        const info = `${id} rating deleted`;
        axios.post("/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
    navigate("/admin/reviews/list", { replace: true });
  };

  return (
    <ReviewsContext.Provider
      value={{
        ...state,
        loadBooks,
        addReview,
        resetForm,
        updateValue,
        getReviews,
        findById,
        editById,
        deleteById
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviewsContext = () => {
  return useContext(ReviewsContext);
};
