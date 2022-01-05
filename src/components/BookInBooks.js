import React from "react";
import styled from "styled-components";
import noPic from "../defaults/bookCover.jpeg";
import priceFormat from "../utils/priceFormat";

const BookInBooks = ({ title, authors, price, language, year }) => {
  return (
    <Wrapper>
      <div className="select">
        <img className="image" src={noPic} alt="book cover" />
        <h4 className="title">{title}</h4>
        <div className="author">
          {authors.map((author, index) => {
            return <p key={index}>{author.last_name}</p>;
          })}
        </div>
        <div className="arrange">
          <p>{language}</p>
          <p>{year}.</p>
          <p>{priceFormat(price)}</p>
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
  }
  h4 {
    display: flex;
    font-size: 1.7rem;
    margin-bottom: 0.2rem;
    color: var(--clr-title-4);
  }
  p {
    text-transform: capitalize;
    font-size: 1.2rem;
  }
  .image {
    margin-top: 0.5rem;
    width: 15rem;
  }
  .author {
    margin-bottom: 0.5rem;
  }
`;
export default BookInBooks;
