import React, { useContext, useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  LOAD_AUTHORS,
  LOAD_INITIATED,
  ERROR_OCCURRED,
  SET_INITIAL_AUTHOR,
  UPDATE_AUTHOR,
  SET_IMAGES
} from "../../actions/admin/authors_actions";

import reducer from "../../reducers/admin/authors_reducer";

const initialState = {
  authorList: [],
  changedAuthor: {
    name: "",
    last_name: "",
    url: "",
    img: [],
    bio: ""
  },
  loading: false,
  error: false
};

const AuthorsAdminContext = React.createContext();

export const AuthorsAdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id } = useParams();
  const navigate = useNavigate();

  const getAuthors = () => {
    dispatch({ type: LOAD_INITIATED });
    axios
      .get("/api/authors/")
      .then((response) => {
        dispatch({ type: LOAD_AUTHORS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        const err = `api: /api/authors/, error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const updateAuthor = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (value === undefined || value === null) {
      value = "";
    }

    dispatch({ type: UPDATE_AUTHOR, payload: { name, value } });
  };

  const getAuthor = (header) => {
    dispatch({ type: LOAD_INITIATED });
    axios
      .post(`/api/authors/${id}`, {
        headers: header(),
        id
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        dispatch({ type: SET_INITIAL_AUTHOR, payload: response.data[0] });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        const err = `api: /api/authors/${id}, [editauthor[POST]] error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const handleAddImages = (e) => {
    const data = new FormData();
    const files = [...e.target.files];
    files.forEach((file) => {
      data.append("images", file);
    });

    axios
      .post("/api/images/addimages", data)
      .then((res) => {
        const tempImages = [...state.changedAuthor.images];
        res.data.forEach((image) => {
          tempImages.push(image.path);
        });
        dispatch({ type: SET_IMAGES, payload: tempImages });
      })
      .catch((error) => {
        const err = `api: /api/images/addimages [editauthor[POST]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const handleDeleteImage = (url) => {
    axios.post("/api/images/deleteimages", { url }).catch((error) => {
      const err = `api: /api/images/deleteimages [editauthor[POST]], error: ${error}`;
      axios.post("/api/system/error", { err });
    });
    const images = state.changedAuthor.images;
    const tempImages = images.filter((image) => image !== url);
    dispatch({ type: SET_IMAGES, payload: tempImages });
  };

  const handleEdit = (header) => {
    const { name, last_name, img: images, url, bio } = state.changedAuthor;
    console.log(id);
    axios
      .put(`/api/authors/${id}`, {
        headers: header(),
        id,
        name,
        last_name,
        images,
        url,
        bio
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        const info = `${id} author edited`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        const err = `api: /api/authors/${id} [editauthor[PUT]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
    navigate("/admin/authors/list", { replace: true });
  };

  const handleDelete = (header) => {
    axios
      .delete(`/api/authors/${id}`, {
        headers: header(),
        data: { id: id }
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        const info = `${id} author deleted`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        const err = `api: /api/authors/${id} [editauthor[DELETE]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
    navigate("/api/admin/authorslist", { replace: true });
  };

  return (
    <AuthorsAdminContext.Provider
      value={{
        ...state,
        getAuthors,
        updateAuthor,
        getAuthor,
        handleAddImages,
        handleDeleteImage,
        handleEdit,
        handleDelete
      }}
    >
      {children}
    </AuthorsAdminContext.Provider>
  );
};

export const useAuthorsContext = () => {
  return useContext(AuthorsAdminContext);
};
