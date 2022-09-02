import {
  LOAD_AUTHORS,
  LOAD_INITIATED,
  ERROR_OCCURRED,
  SET_INITIAL_AUTHOR,
  UPDATE_AUTHOR,
  SET_IMAGES,
  ERROR_CLEARED
} from "../../actions/admin/authors_actions";

const authors_reducer = (state, action) => {
  if (action.type === LOAD_INITIATED) {
    return { ...state, loading: true, error: false };
  }

  if (action.type === ERROR_OCCURRED) {
    return { ...state, error: true, loading: false };
  }
  if (action.type === ERROR_CLEARED) {
    return { ...state, error: false, loading: false };
  }

  if (action.type === LOAD_AUTHORS) {
    return {
      ...state,
      authorList: action.payload,
      loading: false,
      error: false
    };
  }

  if (action.type === SET_INITIAL_AUTHOR) {
    let author = action.payload;
    if (author.img === null || author.img === undefined) {
      author.img = [];
    }
    if (author.name === null || author.name === undefined) {
      author.name = "";
    }
    if (author.last_name === null || author.last_name === undefined) {
      author.last_name = "";
    }
    if (author.url === null || author.url === undefined) {
      author.url = "";
    }
    if (author.bio === null || author.bio === undefined) {
      author.bio = "";
    }
    return {
      ...state,
      changedAuthor: author,
      loading: false,
      error: false
    };
  }

  if (action.type === SET_IMAGES) {
    return {
      ...state,
      changedAuthor: { ...state.changedAuthor, images: action.payload }
    };
  }

  if (action.type === UPDATE_AUTHOR) {
    const { name, value } = action.payload;
    return {
      ...state,
      changedAuthor: { ...state.changedAuthor, [name]: value }
    };
  }
  throw new Error(`No matching ${action.type} action`);
};

export default authors_reducer;
