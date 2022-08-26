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
    axios
      .get("/api/reviews/")
      .then((response) => {
        dispatch({ type: LOAD_ARRAY, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        const err = `api: /reviews/ [listratings[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const loadBooks = () => {
    dispatch({ type: LOAD_INITIATED });
    axios
      .get("/api/books/")
      .then((response) => {
        dispatch({ type: LOAD_SECONDARY_ARRAY, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        const err = `api: /books/ [addrating[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const addReview = (header) => {
    const { book, rating_title, rating, reviewer, review } = state.review;
    axios
      .post("/api/reviews/", {
        headers: header(),
        book,
        rating_title,
        rating,
        reviewer,
        review
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        const info = `${rating_title} rating added`;
        axios.post("/system/info", { info });
      })
      .catch((error) => {
        const err = `api: /reviews/ [addrating[POST]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });

    navigate("/admin/reviews/list", { replace: true });
  };

  const findById = (header, id) => {
    axios
      .post(`/api/reviews/${id}`, {
        headers: header(),
        id
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        dispatch({ type: LOAD_VALUE, payload: response.data });
      })
      .catch((error) => {
        const err = `api: /reviews/${id} [editrating[POST]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const editById = (header, id) => {
    const { book, rating_title, rating, review, reviewer } = state.review;
    axios
      .put(`/api/reviews/${id}`, {
        headers: header(),
        id,
        book,
        rating_title,
        rating,
        reviewer,
        review
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        const info = `${id} rating edited`;
        axios.post("/system/info", { info });
      })
      .catch((error) => {
        const err = `api: /reviews/${id} [editrating[PUT]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });

    navigate("/admin/reviews/list", { replace: true });
  };

  const deleteById = (header, id) => {
    axios
      .delete(`/api/reviews/${id}`, {
        headers: header(),
        data: { id: id }
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        const info = `${id} rating deleted`;
        axios.post("/system/info", { info });
      })
      .catch((error) => {
        const err = `api: /reviews/${id} [editrating[DELETE]], error: ${error}`;
        axios.post("/api/system/error", { err });
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
