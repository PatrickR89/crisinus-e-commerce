import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/authors_reducer";

import {
  GET_ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_ITEMS_DONE,
  ASSIGN_AUTHORS,
  SET_AUTHOR_NAME,
  SET_BOOKS_PER_AUTHOR,
  SET_CURRENT_AUTHOR
} from "../actions/authors_actions";

import mockBooks from "../mockData/mockBooks";
import mockAuthors from "../mockData/mockAuthors";

const initialState = {
  authorArray: [],
  booksArray: [],
  authorsList: [],
  booksByAuthor: [],
  authorName: "",
  author_url: "",
  currentAuthor: {},
  isLoading: true
};

const AuthorsContext = React.createContext();

export const AuthorsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchItems = () => {
    dispatch({ type: GET_ITEMS_START });
    try {
      const books = mockBooks;
      const authors = mockAuthors;
      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: [books, authors]
      });
      setTimeout(() => {
        dispatch({ type: GET_ITEMS_DONE });
      }, 300);
    } catch (error) {
      dispatch({ GET_ITEMS_ERROR });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    dispatch({ type: ASSIGN_AUTHORS, payload: state.booksArray });
  }, [state.booksArray]);

  useEffect(() => {
    dispatch({ type: GET_ITEMS_START });
    if (
      !state.currentAuthor ||
      JSON.stringify(
        `${state.currentAuthor.name} ${state.currentAuthor.last_name}`
          .replace(/\s+/g, "-")
          .toLowerCase()
      ) !== JSON.stringify(`${state.author_url}`)
    ) {
      const tempBooks = booksPerAuthor(state.authorName);
      dispatch({ type: SET_BOOKS_PER_AUTHOR, payload: tempBooks });
      const switchAuthor = state.authorArray.find(
        (author) =>
          JSON.stringify(
            `${author.name} ${author.last_name}`
              .replace(/\s+/g, "-")
              .toLowerCase()
          ) === JSON.stringify(`${state.author_url}`)
      );

      dispatch({ type: SET_CURRENT_AUTHOR, payload: switchAuthor });
    }

    setTimeout(() => {
      dispatch({ type: GET_ITEMS_DONE });
    }, 300);
  }, [state.author_url, state.currentAuthor, state.authorName]);

  const booksPerAuthor = (name) => {
    return state.booksArray.filter((book) => {
      return book.authors.find(
        (author) => `${author.name} ${author.last_name}` === `${name}`
      );
    });
  };

  const authorChange = (author) => {
    dispatch({ type: GET_ITEMS_START });
    console.log(author);
    dispatch({ type: SET_AUTHOR_NAME, payload: author });
  };

  return (
    <AuthorsContext.Provider value={{ ...state, authorChange }}>
      {children}
    </AuthorsContext.Provider>
  );
};

export const useAuthorsContext = () => {
  return useContext(AuthorsContext);
};
