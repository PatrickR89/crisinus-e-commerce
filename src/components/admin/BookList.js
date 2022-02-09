import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { useCurrencyContext } from "../../contexts/currency_context";

const BookList = () => {
  const [bookList, setBookList] = useState([]);
  const [authorsList, setAuthorsList] = useState([]);

  const { priceFormat } = useCurrencyContext();

  const retrieveBooks = () => {
    axios.get("http://localhost:3001/books/booklist").then((response) => {
      setBookList(response.data);
    });
  };
  const retrieveAuthors = () => {
    axios.get("http://localhost:3001/books/authorList").then((response) => {
      setAuthorsList(response.data);
    });
  };

  useEffect(() => {
    retrieveBooks();
    retrieveAuthors();
  }, []);
  //   bookList.map((book) => {
  //     book.authors.forEach((id, index) => {
  //       const author = authorsList.find((author) => author.id == id);
  //     });
  //   });

  return (
    <Wrapper>
      <div className="per-book head">
        <section>ID</section>
        <section>TITLE</section>
        <section>AUTHORS</section>
        <section>YEAR</section>
        <section>LANGUAGE</section>
        <section>PRICE</section>
      </div>
      {bookList.map((book, index) => {
        return (
          <div
            key={index}
            className={
              index % 2 === 0
                ? "itm-background-one per-book"
                : "itm-background-two per-book"
            }
          >
            <p>{book.id}</p>
            <h4>{book.title}</h4>
            <div>
              {book.authors.map((id, index) => {
                const author = authorsList.find((author) => author.id == id);
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
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
