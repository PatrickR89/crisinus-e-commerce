import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_ITEMS,
  UPDATE_FILTER,
  FILTER_ITEMS,
  CLEAR_FILTER,
  UPDATE_GIFT_FILTER,
  FILTER_GIFTS,
  CLEAR_GIFT_FILTER
} from "../actions/filter_actions";

import { useItemsContext } from "./items_context";

const initialState = {
  filtered_books: [],
  all_books: [],
  all_gifts: [],
  filtered_gifts: [],
  filters: {
    title: "",
    author: "--",
    publisher: "--",
    language: "--",
    genre: "--",
    year: "--"
  },
  gifts_filters: {
    text: "",
    min_price: 0,
    max_price: 0,
    price: 0
  }
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { books, gifts } = useItemsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_ITEMS, payload: [books, gifts] });
  }, [books, gifts]);

  useEffect(() => {
    dispatch({ type: FILTER_ITEMS });
  }, [books, state.filters]);

  useEffect(() => {
    dispatch({ type: FILTER_GIFTS });
  }, [gifts, state.gifts_filters]);

  const updateFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    dispatch({ type: UPDATE_FILTER, payload: { name, value } });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const updateGiftsFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    dispatch({ type: UPDATE_GIFT_FILTER, payload: { name, value } });
  };

  const clearGiftsFilter = () => {
    dispatch({ type: CLEAR_GIFT_FILTER });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateFilter,
        clearFilter,
        updateGiftsFilter,
        clearGiftsFilter
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
