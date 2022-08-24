import {
  LOAD_INITIATED,
  ERROR_OCCURRED,
  LOAD_AUTHORS,
  LOAD_BOOKS,
  LOAD_BOOK,
  HANDLE_AUTHORS,
  ADD_AUTHOR_SPOT,
  SET_IMAGES,
  UPDATE_BOOK
} from "../../actions/admin/books_actions";

const books_reducer = (state, action) => {
  if (action.type === LOAD_INITIATED) {
    return { ...state, loading: true, error: false };
  }

  if (action.type === ERROR_OCCURRED) {
    return { ...state, error: true, loading: false };
  }

  if (action.type === LOAD_AUTHORS) {
    return {
      ...state,
      authorsList: action.payload,
      loading: false,
      error: false
    };
  }

  if (action.type === HANDLE_AUTHORS) {
    return { ...state, book: { ...state.book, authors: action.payload } };
  }

  if (action.type === LOAD_BOOKS) {
    return {
      ...state,
      booksList: action.payload,
      loading: false,
      error: false
    };
  }

  if (action.type === ADD_AUTHOR_SPOT) {
    return {
      ...state,
      book: {
        ...state.book,
        authors: [...state.book.authors, { name: "", last_name: "" }]
      }
    };
  }

  if (action.type === SET_IMAGES) {
    return { ...state, book: { ...state.book, images: action.payload } };
  }

  if (action.type === UPDATE_BOOK) {
    const { name, value } = action.payload;
    return { ...state, book: { ...state.book, [name]: value } };
  }

  if (action.type === LOAD_BOOK) {
    const book = action.payload[0];
    const authors = action.payload[1];

    book.authors = authors.map((initAuthor) => {
      return {
        name: initAuthor.name,
        last_name: initAuthor.last_name
      };
    });
    return { ...state, book: book, load: false, error: false };
  }
  throw new Error(`No matching ${action.type} action`);
};

export default books_reducer;
