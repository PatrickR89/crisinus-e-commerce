import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { useCurrencyContext } from "../../../contexts/currency_context";
import { useLanguageContext } from "../../../contexts/language_context";

import ListLink from "../elements/ListLink";
import ListHead from "../elements/ListHead";

const BookList = () => {
  const [bookList, setBookList] = useState([]);
  const [authorsList, setAuthorsList] = useState([]);

  const { priceFormat } = useCurrencyContext();
  const { translation } = useLanguageContext();
  const { title, authors, year, language, price } = translation;

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

  const titles = ["ID", title, authors, year, language, price];

  useEffect(() => {
    retrieveBooks();
    retrieveAuthors();
  }, []);

  return (
    <main>
      <Wrapper>
        <h2>{translation.booksList.toUpperCase()}</h2>
        <ListHead colTitles={titles} />
        {bookList.map((book, index) => {
          return (
            <ListLink
              key={index}
              index={index}
              cols={6}
              url={`/admin/editbook/${book.id}`}
            >
              <p>{book.id}</p>
              <h4>{book.title}</h4>

              <div>
                {book.authors.map((id, index) => {
                  const author = authorsList.find((author) => author.id === id);
                  if (author) {
                    return (
                      <p key={index}>
                        {author.name} {author.last_name}
                      </p>
                    );
                  }
                })}
              </div>
              <p>{book.year}</p>
              <p>{book.language}</p>
              <p>{priceFormat(book.price)}</p>
            </ListLink>
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
`;

export default BookList;
