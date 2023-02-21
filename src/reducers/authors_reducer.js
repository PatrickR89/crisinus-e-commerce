import axios from "axios";
import {
  GET_ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  SET_BOOKS_PER_AUTHOR,
  SET_AUTHORS_IDS,
  SET_ACTIVE_AUTHOR
} from "../actions/authors_actions";

const authors_reducer = (state, action) => {
  if (action.type === GET_ITEMS_START) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_ITEMS_SUCCESS) {
    return {
      ...state,
      books: action.payload[0],
      authors: action.payload[1],
      isLoading: false,
      isError: false
    };
  }
  if (action.type === GET_ITEMS_ERROR) {
    return { ...state, isLoading: false, isError: true };
  }

  if (action.type === SET_AUTHORS_IDS) {
    const tempBooks = action.payload;
    if (!Array.isArray(tempBooks)) {
      const err = `Error occured in authors reducer mapping author from books: ${JSON.stringify(
        tempBooks
      )}`;

      axios.post("/api/system/error", { err });
      return { ...state, authorsIDs: [] };
    } else {
      const tempIDs = [
        ...new Set(
          tempBooks
            .map((book) => {
              if (!Array.isArray(book.authors)) {
                const err = `Error occured in authors reducer mapping author from single book: ${JSON.stringify(
                  book
                )}`;

                axios.post("/api/system/error", { err });
                return [];
              }
              return book?.authors.map((author) => {
                return author;
              });
            })
            .flat(1)
        )
      ];
      return { ...state, authorsIDs: tempIDs };
    }
  }

  if (action.type === SET_ACTIVE_AUTHOR) {
    return {
      ...state,
      activeAuthor: action.payload,
      isLoading: false,
      isError: false
    };
  }
  if (action.type === SET_BOOKS_PER_AUTHOR) {
    const books = action.payload[0];
    const authorID = action.payload[1];

    const bookIds = books.filter((book) => {
      const authorList = book.authors;
      if (!Array.isArray(authorList)) {
        return { bio: "", id: "", img: "", last_name: "", name: "", url: "" };
      }
      return book.authors.find((author) => author === authorID);
    });

    return { ...state, booksByAuthor: bookIds };
  }

  throw new Error(`No matching "${JSON.stringify(action.type)}" action`);
};

export default authors_reducer;
