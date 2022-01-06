import {
  LOAD_ITEMS,
  UPDATE_FILTER,
  FILTER_ITEMS,
  CLEAR_FILTER,
  UPDATE_GIFT_FILTER,
  FILTER_GIFTS,
  CLEAR_GIFT_FILTER
} from "../actions/filter_actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_ITEMS) {
    let maxPrice = action.payload[1].map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      all_books: action.payload[0],
      filtered_books: action.payload[0],
      all_gifts: action.payload[1],
      filtered_gifts: action.payload[1],
      filters: { ...state.filters },
      gifts_filters: {
        ...state.gifts_filters,
        max_price: maxPrice,
        price: maxPrice
      }
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
    if (author !== "--") {
      tempBooks = tempBooks.filter((book) =>
        book.authors.find(
          (bookAuthor) => `${bookAuthor.name} ${bookAuthor.last_name}` == author
        )
      );
    }
    if (year !== "--") {
      tempBooks = tempBooks.filter((book) => book.year === parseInt(year));
    }
    if (publisher !== "--") {
      tempBooks = tempBooks.filter((book) => book.publisher === publisher);
    }
    if (language !== "--") {
      tempBooks = tempBooks.filter((book) => book.language === language);
    }
    if (genre !== "--") {
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
        author: "--",
        publisher: "--",
        language: "--",
        genre: "--",
        year: "--"
      }
    };
  }

  if (action.type === FILTER_GIFTS) {
    const { all_gifts } = state;
    const { text, price } = state.gifts_filters;

    let tempGifts = [...all_gifts];
    if (text) {
      tempGifts = tempGifts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    tempGifts = tempGifts.filter((gift) => gift.price <= price);

    return { ...state, filtered_gifts: tempGifts };
  }

  if (action.type === UPDATE_GIFT_FILTER) {
    const { name, value } = action.payload;
    return {
      ...state,
      gifts_filters: { ...state.gifts_filters, [name]: value }
    };
  }

  if (action.type === CLEAR_GIFT_FILTER) {
    return {
      ...state,
      gifts_filters: {
        ...state.gifts_filters,
        text: "",
        price: state.gifts_filters.max_price
      }
    };
  }
  throw new Error(`no matchin "${action.type}" action`);
};

export default filter_reducer;
