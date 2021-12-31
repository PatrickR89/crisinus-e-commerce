import React from "react";
import styled from "styled-components";
import noPic from "../defaults/bookCover.jpeg";

const formatPrice = (price) => {
  return price / 100;
};

const BookInBooks = ({ id, title, authors, price, stock, language, year }) => {
  return (
    <Wrapper>
      <div className="select">
        <img className="image" src={noPic} alt="book cover" />
        <h4 className="title">{title}</h4>
        {authors.map((author) => {
          return <p>{author.last_name}</p>;
        })}
        <div className="arrange">
          <p>{language}</p>
          <p>{year}.</p>
          <p>{formatPrice(price)}kn</p>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: block;
  .select {
    transition: 0.1s ease-in-out;
  }
  .select:hover {
    background: var(--clr-par-10);
  }
  .arrange {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  h4 {
    display: flex;
    font-size: 2.5rem;
    margin-bottom: 0.2rem;
    color: var(--clr-title-4);
  }
  p {
    text-transform: capitalize;
    font-size: 1.75rem;
  }
  .image {
    margin-top: 0.5rem;
    width: 15rem;
  }
`;
export default BookInBooks;
