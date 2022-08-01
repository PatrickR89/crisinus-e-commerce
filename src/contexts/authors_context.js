import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/authors_reducer";

import {
    GET_ITEMS_START,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_ERROR,
    SET_BOOKS_PER_AUTHOR,
    SET_AUTHORS_IDS,
    SET_ACTIVE_AUTHOR
} from "../actions/authors_actions";

const initialState = {
    booksByAuthor: [],
    isLoading: true,
    isError: false,
    authors: [],
    books: [],
    authorID: "",
    activeAuthor: {}
};

const AuthorsContext = React.createContext();

export const AuthorsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchItems = () => {
        dispatch({ type: GET_ITEMS_START });

        axios
            .get("/api/public/authors")
            .then((response) => {
                const booksImport = response.data[1];
                const authorsImport = response.data[0];
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    payload: [booksImport, authorsImport]
                });
            })
            .catch((error) => {
                const err = `api: /api/public/authors [athrs_ctxt[GET]], error: ${error}`;
                axios.post("/api/system/error", { err });
                dispatch({ GET_ITEMS_ERROR });
            });
    };

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        dispatch({ type: SET_AUTHORS_IDS, payload: state.books });
    }, [state.books]);

    const changeAuthor = async (author) => {
        dispatch({ type: GET_ITEMS_START });

        axios.post("/api/public/authors", { author }).then((response) => {
            const fullAuthor = response.data[0];
            dispatch({ type: SET_ACTIVE_AUTHOR, payload: fullAuthor });
            dispatch({
                type: SET_BOOKS_PER_AUTHOR,
                payload: [state.books, fullAuthor.id]
            }).catch((error) => {
                const err = `api: /api/public/authors [athrs_ctxt[POST]], error: ${error}`;
                axios.post("/api/system/error", { err });
                dispatch({ GET_ITEMS_ERROR });
            });
        });
    };

    return (
        <AuthorsContext.Provider value={{ ...state, changeAuthor }}>
            {children}
        </AuthorsContext.Provider>
    );
};

export const useAuthorsContext = () => {
    return useContext(AuthorsContext);
};
