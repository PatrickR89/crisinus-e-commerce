import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_ITEMS,
  UPDATE_FILTER,
  FILTER_ITEMS,
  CLEAR_FILTER
} from "../actions/filter_actions";

import { useBooksContext } from "./books_context";

const initialState = {
  filtered_books: [],
  all_books: [],
  filters: {
    title: "",
    author: "all",
    publisher: "all",
    language: "all",
    genre: "all",
    year: "all"
  }
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { books } = useBooksContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_ITEMS, payload: books });
  }, [books]);

  useEffect(() => {
    dispatch({ type: FILTER_ITEMS });
  }, [books, state.filters]);

  const updateFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    dispatch({ type: UPDATE_FILTER, payload: { name, value } });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <FilterContext.Provider value={{ ...state, updateFilter, clearFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
