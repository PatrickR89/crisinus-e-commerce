import React, { useContext, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  LOAD_AUTHORS,
  LOAD_INITIATED,
  ERROR_OCCURRED,
  SET_INITIAL_AUTHOR,
  UPDATE_AUTHOR,
  SET_IMAGES,
  ERROR_CLEARED
} from "../../actions/admin/authors_actions";

import reducer from "../../reducers/admin/authors_reducer";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useErrorReport } from "../../hooks/useErrorReport";

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
  const checkAuth = useCheckAuth();
  const errorReport = useErrorReport();
  const baseUrl = "/api/authors/";

  const getAuthors = () => {
    dispatch({ type: LOAD_INITIATED });
    const url = `${baseUrl}`;
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
        dispatch({ type: SET_INITIAL_AUTHOR, payload: response.data[0] });
      })
      .catch((error) => {
        dispatch({ type: ERROR_OCCURRED });
        errorReport(error, url, window.location.pathname, method);
      });
  };

  const handleAddImages = (e) => {
    const data = new FormData();
    const files = [...e.target.files];
    files.forEach((file) => {
      data.append("images", file);
    });
    // for (const item of data.entries()) {
    //   console.log(item);
    // }
    axios
      .post("/api/images/addimages", data)
      .then((res) => {
        const tempImages = [...state.changedAuthor.img];
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

  const handleUploadedImages = (imageUrl) => {
    const tempImages = [...state.changedAuthor.img];
    tempImages.push(imageUrl);
    dispatch({ type: SET_IMAGES, payload: tempImages });
  };

  const handleEdit = (header) => {
    const { name, last_name, img, url: authorUrl, bio } = state.changedAuthor;

    const url = `${baseUrl}${id}`;
    const method = "put";
    axios({
      url: url,
      method: method,
      headers: header(),
      data: { id, name, last_name, img, url: authorUrl, bio }
    })
      .then((response) => {
        checkAuth(response);
        const info = `${id} author edited`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
    navigate("/admin/authors/list", { replace: true });
  };

  const handleDelete = (header) => {
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
        const info = `${id} author deleted`;
        axios.post("/api/system/info", { info });
      })
      .catch((error) => {
        errorReport(error, url, window.location.pathname, method);
      });
    navigate("/api/admin/authorslist", { replace: true });
  };

  const clearError = () => {
    dispatch({ type: ERROR_CLEARED });
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
        handleDelete,
        clearError,
        handleUploadedImages
      }}
    >
      {children}
    </AuthorsAdminContext.Provider>
  );
};

export const useAuthorsContext = () => {
  return useContext(AuthorsAdminContext);
};
