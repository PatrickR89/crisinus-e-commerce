import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFetchItems } from "../hooks/useFetchItems";

import { BookInBooks } from "../components";

const BooksList = ({ initialBooks }) => {
  const { loading, data } = useFetchItems(initialBooks, 8);
  const [page, setPage] = useState(0);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (loading) return;
    setBooks(data[page]);
  }, [loading, page, data]);

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1;
      }
      return prevPage;
    });
  };

  if (initialBooks.length < 1 || !books) {
    return <h4>No produtcs match...</h4>;
  }

  return (
    <Wrapper>
      {!loading && initialBooks.length > 8 && (
        <div className="btn-container">
          <button className="btn" onClick={prevPage}>
            prev
          </button>
          <button className="btn" onClick={nextPage}>
            next
          </button>
        </div>
      )}
      <ul className="home-books">
        {books.map((book) => {
          return (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>
                <BookInBooks {...book} />
              </Link>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  .home-books {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: start;
    justify-content: space-between;
    margin: 1rem;
  }
  .btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .btn {
      padding: 0.375rem 2.5rem;
    }
  }
`;

export default BooksList;
