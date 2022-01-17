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

const authors_reducer = (state, action) => {
  if (action.type === GET_ITEMS_START) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_ITEMS_SUCCESS) {
    return {
      ...state,

      booksArray: action.payload[0],
      authorArray: action.payload[1]
    };
  }
  if (action.type === GET_ITEMS_ERROR) {
    return { ...state, isLoading: false, items_error: true };
  }
  if (action.type === GET_ITEMS_DONE) {
    return { ...state, isLoading: false };
  }
  if (action.type === ASSIGN_AUTHORS) {
    const booksArray = action.payload;
    const tempAuthors = [
      ...new Set(
        booksArray
          .map((book) => {
            return book.authors.map((author) => {
              return `${author.name} ${author.last_name}`;
            });
          })
          .flat(1)
      )
    ];
    return { ...state, authorsList: tempAuthors };
  }
  if (action.type === SET_AUTHOR_NAME) {
    return {
      ...state,
      authorName: action.payload.replace("-", " "),
      author_url: action.payload
    };
  }
  if (action.type === SET_BOOKS_PER_AUTHOR) {
    return { ...state, booksByAuthor: action.payload };
  }
  if (action.type === SET_CURRENT_AUTHOR) {
    return { ...state, currentAuthor: action.payload };
  }
  throw new Error(`No matching "${action.type}" action`);
};

export default authors_reducer;
