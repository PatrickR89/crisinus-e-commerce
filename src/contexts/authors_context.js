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

    const fetchItems = async () => {
        dispatch({ type: GET_ITEMS_START });
        try {
            const axiosResponse = await axios.get(
                "http://localhost:3001/public/authors"
            );
            const booksImport = await axiosResponse.data[1];
            const authorsImport = await axiosResponse.data[0];
            dispatch({
                type: GET_ITEMS_SUCCESS,
                payload: [booksImport, authorsImport]
            });
        } catch (error) {
            dispatch({ GET_ITEMS_ERROR });
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        dispatch({ type: SET_AUTHORS_IDS, payload: state.books });
    }, [state.books]);

    const changeAuthor = async (author) => {
        dispatch({ type: GET_ITEMS_START });

        const response = await axios.post(
            "http://localhost:3001/public/authors",
            { author }
        );
        const fullAuthor = await response.data[0];
        dispatch({ type: SET_ACTIVE_AUTHOR, payload: fullAuthor });
        dispatch({
            type: SET_BOOKS_PER_AUTHOR,
            payload: [state.books, fullAuthor.id]
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
