import {
  SET_BOOK_IDS,
  SET_BOOK_LIST,
  SET_CURRENT_BOOK,
  LOADING_START,
  LOADING_END,
  SET_REVIEWS_PER_BOOK,
  SET_CURRENT_BOOK_OBJ
} from "../actions/reviews_actions";

const reviews_reducer = (state, action) => {
  if (action.type === LOADING_START) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOADING_END) {
    return { ...state, isLoading: false };
  }
  if (action.type === SET_BOOK_IDS) {
    const tempReviews = action.payload;
    const tempBooks = [
      ...new Set(
        tempReviews.map((review) => {
          return review.bookId;
        })
      )
    ];
    return { ...state, bookIds: tempBooks };
  }

  if (action.type === SET_BOOK_LIST) {
    const bookIds = action.payload[0];
    const books = action.payload[1];
    const tempList = bookIds
      .map((id) => {
        return books.filter((book) => book.id === id);
      })
      .flat(1);
    return { ...state, bookList: tempList };
  }
  if (action.type === SET_CURRENT_BOOK) {
    return { ...state, currentBook: action.payload };
  }

  if (action.type === SET_REVIEWS_PER_BOOK) {
    return { ...state, reviewsPerBook: action.payload };
  }
  if (action.type === SET_CURRENT_BOOK_OBJ) {
    return { ...state, currentBookObject: action.payload };
  }
  throw new Error(`No matching "${action.type}" action`);
};

export default reviews_reducer;
