import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {};

import {} from "../../actions/admin/reviews_actions";

import reducer from "../../reducers/admin/reviews_reducer";

const ReviewsContext = React.createContext();

export const ReviewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ReviewsContext.Provider value={{ ...state }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviewsContext = () => {
  return useContext(ReviewsContext);
};
