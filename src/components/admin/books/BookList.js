import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { useCurrencyContext } from "../../../contexts/currency_context";
import { useLanguageContext } from "../../../contexts/language_context";

const BookList = () => {
    const [bookList, setBookList] = useState([]);
    const [authorsList, setAuthorsList] = useState([]);

    const { priceFormat } = useCurrencyContext();
    const { translation } = useLanguageContext();

    const retrieveBooks = () => {
        axios
            .get("/api/books/")
            .then((response) => {
                setBookList(response.data);
            })
            .catch((error) => {
                const err = `api: /api/books/ [booklist[GET]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };
    const retrieveAuthors = () => {
        axios
            .get("/api/authors/")
            .then((response) => {
                setAuthorsList(response.data);
            })
            .catch((error) => {
                const err = `api: /api/authors/ [booklist[GET]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };

    useEffect(() => {
        retrieveBooks();
        retrieveAuthors();
    }, []);

    return (
        <main>
            <Wrapper>
                <h2>{translation.booksList.toUpperCase()}</h2>
                <div className="per-book head">
                    <section>ID</section>
                    <section>{translation.title.toUpperCase()}</section>
                    <section>{translation.authors.toUpperCase()}</section>
                    <section>{translation.year.toUpperCase()}</section>
                    <section>{translation.language.toUpperCase()}</section>
                    <section>{translation.price.toUpperCase()}</section>
                </div>
                {bookList.map((book, index) => {
                    return (
                        <Link to={`/admin/editbook/${book.id}`} key={index}>
                            <div
                                className={
                                    index % 2 === 0
                                        ? "itm-background-one per-book on-hover-list"
                                        : "itm-background-two per-book on-hover-list"
                                }
                            >
                                <p>{book.id}</p>
                                <h4>{book.title}</h4>

                                <div>
                                    {book.authors.map((id, index) => {
                                        const author = authorsList.find(
                                            (author) => author.id === id
                                        );
                                        if (author) {
                                            return (
                                                <p key={index}>
                                                    {author.name}{" "}
                                                    {author.last_name}
                                                </p>
                                            );
                                        }
                                    })}
                                </div>
                                <p>{book.year}</p>
                                <p>{book.language}</p>
                                <p>{priceFormat(book.price)}</p>
                            </div>
                        </Link>
                    );
                })}
            </Wrapper>
        </main>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    .per-book {
        display: inline-grid;
        grid-template-columns: repeat(6, 1fr);
        align-items: center;
    }
    .head {
        margin-bottom: 2rem;
    }
`;

export default BookList;
