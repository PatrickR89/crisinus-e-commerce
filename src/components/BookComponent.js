import React from "react";
import styled from "styled-components";
import noPic from "../defaults/bookCover.jpeg";

const formatPrice = (price) => {
  return price / 100;
};

const BookComponent = ({ id, title, authors, price }) => {
  return (
    <Wrapper>
      <div className="select">
        <img className="image" src={noPic} alt="book cover" />
        <h4 className="title">{title}</h4>
        {authors.map((author) => {
          return <p>{author.last_name}</p>;
        })}
        <p>{formatPrice(price)}kn</p>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: block;

  h4 {
    display: flex;
    font-size: 15px;
    margin-bottom: 0.2rem;
    color: var(--clr-title-4);
  }
  p {
    text-transform: capitalize;
    font-size: 12px;
  }
  .image {
    margin-top: 0.5rem;
    width: 150px;
  }
`;
export default BookComponent;
