import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useItemsContext } from "../contexts/items_context";
import BookComponent from "./BookComponent";

const OurBooks = () => {
  const { books } = useItemsContext();

  return (
    <Wrapper>
      <ul className="home-books">
        {books.slice(0, 10).map((book) => {
          return (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>
                <BookComponent {...book} />
              </Link>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: var(--clr-button-5);
  padding: 2rem;
  .home-books {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: start;
    justify-content: space-between;
    margin: 0.5rem;
  }
`;

export default OurBooks;
