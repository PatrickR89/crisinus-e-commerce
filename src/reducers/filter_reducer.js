import {
  LOAD_ITEMS,
  UPDATE_FILTER,
  FILTER_ITEMS,
  CLEAR_FILTER
} from "../actions/filter_actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_ITEMS) {
    return {
      ...state,
      all_books: action.payload,
      filtered_books: action.payload,
      filters: { ...state.filters }
    };
  }
  if (action.type === UPDATE_FILTER) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_ITEMS) {
    const { all_books } = state;
    const { title, author, year, publisher, language, genre } = state.filters;
    let tempBooks = [...all_books];

    if (title) {
      tempBooks = tempBooks.filter((book) => {
        return book.title.toLowerCase().startsWith(title);
      });
    }
    if (author !== "all") {
      tempBooks = tempBooks.filter((book) =>
        book.authors.find(
          (bookAuthor) => `${bookAuthor.name} ${bookAuthor.last_name}` == author
        )
      );
    }
    if (year !== "all") {
      tempBooks = tempBooks.filter((book) => book.year === parseInt(year));
    }
    if (publisher !== "all") {
      tempBooks = tempBooks.filter((book) => book.publisher === publisher);
    }
    if (language !== "all") {
      tempBooks = tempBooks.filter((book) => book.language === language);
    }
    if (genre !== "all") {
      tempBooks = tempBooks.filter((book) => book.genre === genre);
    }
    return { ...state, filtered_books: tempBooks };
  }

  if (action.type === CLEAR_FILTER) {
    return {
      ...state,
      filters: {
        ...state.filters,
        title: "",
        author: "all",
        publisher: "all",
        language: "all",
        genre: "all",
        year: "all"
      }
    };
  }

  throw new Error(`no matchin "${action.type}" action`);
};

export default filter_reducer;
