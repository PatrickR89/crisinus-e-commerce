import React, { useContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  LOAD_INITIATED,
  ERROR_OCCURRED,
  LOAD_AUTHORS,
  LOAD_BOOKS,
  LOAD_BOOK,
  HANDLE_AUTHORS,
  ADD_AUTHOR_SPOT,
  SET_IMAGES,
  UPDATE_BOOK,
  ERROR_CLEARED
} from "../../actions/admin/books_actions";

import reducer from "../../reducers/admin/books_reducer";

import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useErrorReport } from "../../hooks/useErrorReport";

const initialState = {
  loading: false,
  error: false,
  book: {
    title: "",
    authors: [{ name: "", last_name: "" }],
    images: [],
    genre: "",
    max_order: 0,
    price: 0,
    publisher: "",
    language: "",
    year: 2000,
    description: ""
  },
  booksList: [],
  authorsList: []
};

const BooksContext = React.createContext();

export const BooksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const checkAuth = useCheckAuth();
  const errorReport = useErrorReport();
  const baseUrl = "/api/books/";
  const secUrl = "/api/authors/";

  const resetForm = () => {
    const emptyBook = {
      title: "",
      authors: [{ name: "", last_name: "" }],
      images: [],
      genre: "",
      max_order: 0,
      price: 0,
      publisher: "",
      language: "",
      year: 2000,
      description: ""
    };
    dispatch({
      type: LOAD_BOOK,
      payload: [emptyBook, [{ name: "", last_name: "" }]]
    });
  };

  const updateBook = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (value === undefined || value === null) {
      value = "";
    }

    dispatch({ type: UPDATE_BOOK, payload: { name, value } });
  };

  const loadAuthors = () => {
    dispatch({ type: LOAD_INITIATED });
    const url = `${secUrl}`;
    const method = "get";
    axios({
      url: url,
      method: method
    })
      .then((response) => {
        dispatch({ type: LOAD_AUTHORS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const loadBooks = () => {
    dispatch({ type: LOAD_INITIATED });
    const url = `${baseUrl}`;
    const method = "get";
    axios({
      url: url,
      method: method
    })
      .then((response) => {
        dispatch({ type: LOAD_BOOKS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const handleAuthorInput = (e, index) => {
    const { name, value } = e.target;
    const tempAuthors = [...state.book.authors];
    tempAuthors[index][name] = value;
    dispatch({ type: HANDLE_AUTHORS, payload: tempAuthors });
  };

  const handleRemove = (index) => {
    const tempAuthors = [...state.book.authors];
    tempAuthors.splice(index, 1);
    dispatch({ type: HANDLE_AUTHORS, payload: tempAuthors });
  };

  const handleAdd = () => {
    dispatch({ type: ADD_AUTHOR_SPOT });
  };

  const handleImages = (e) => {
    const data = new FormData();
    const files = [...e.target.files];
    files.forEach((file) => {
      data.append("images", file);
    });

    axios
      .post("/api/images/addimages", data)
      .then((res) => {
        const tempImages = [...state.book.images];
        res.data.forEach((image) => {
          tempImages.push(image.path);
        });
        dispatch({ type: SET_IMAGES, payload: tempImages });
      })
      .catch((error) => {
        const err = `api: /api/images/addimages [addbook[POST]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const handleDelete = (url) => {
    axios.post("/api/images/deleteimages", { url }).catch((error) => {
      const err = `api: api/images/deleteimages [editbook[POST]], error: ${error}`;
      axios.post("/api/system/error", { err });
    });
    const tempImages = state.book.images.filter((image) => image !== url);
    dispatch({ type: SET_IMAGES, payload: tempImages });
  };

  const addBook = (header) => {
    const {
      title,
      authors,
      images,
      genre,
      max_order: maxOrder,
      price,
      publisher,
      language,
      year,
      description: desc
    } = state.book;

    const url = `${baseUrl}`;
    const method = "post";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: {
        title,
        genre,
        maxOrder,
        price,
        publisher,
        language,
        year,
        desc,
        images,
        authors
      }
    })
      .then((response) => {
        checkAuth(response);
        const info = `${title} book added`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });

    navigate("/admin/books/list", { replace: true });
  };

  const findById = (id, header) => {
    dispatch({ type: LOAD_INITIATED });
    const url = `${baseUrl}${id}`;
    const method = "post";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id }
    })
      .then((response) => {
        checkAuth(response);
        const book = response.data[0];
        const authors = response.data[1];
        dispatch({ type: LOAD_BOOK, payload: [book, authors] });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const editById = (id, header) => {
    const bookId = id;
    const {
      title,
      authors,
      images,
      genre,
      max_order: maxOrder,
      price,
      publisher,
      language,
      year,
      description: desc
    } = state.book;
    const url = `${baseUrl}${id}`;
    const method = "put";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: {
        bookId,
        title,
        authors,
        images,
        genre,
        maxOrder,
        price,
        publisher,
        language,
        year,
        desc
      }
    })
      .then((response) => {
        checkAuth(response);
        const info = `${id} book edited`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
    navigate("/admin/books/list", { replace: true });
  };

  const deleteById = (id, header) => {
    const url = `${baseUrl}${id}`;
    const method = "delete";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id: id }
    })
      .then((response) => {
        checkAuth(response);
        const info = `${id} book deleted`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
    navigate("/admin/books/list", { replace: true });
  };

  const clearError = () => {
    dispatch({ type: ERROR_CLEARED });
  };

  return (
    <BooksContext.Provider
      value={{
        ...state,
        loadAuthors,
        handleAuthorInput,
        handleRemove,
        handleAdd,
        handleImages,
        handleDelete,
        addBook,
        updateBook,
        loadBooks,
        findById,
        editById,
        deleteById,
        resetForm,
        clearError
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = () => {
  return useContext(BooksContext);
};
