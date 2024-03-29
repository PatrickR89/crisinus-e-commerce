import React from "react";
import styled from "styled-components";
import noPic from "../../../defaults/bookCover.jpeg";
import formatPrice from "../../../utils/formatPrice";

const BookComponent = ({ title, authors, price, images }) => {
  return (
    <Wrapper>
      <div className="select">
        {images[0] ? (
          <img className="image" src={`/${images[0]}`} alt="book cover" />
        ) : (
          <img className="image" src={noPic} alt="book cover" />
        )}
        <h4 className="title">{title}</h4>
        {authors?.length !== undefined &&
          authors !== undefined &&
          authors !== null &&
          authors?.length > 0 &&
          Array.isArray(authors) &&
          authors?.map((author, index) => {
            return <p key={index}>{author.last_name}</p>;
          })}
        <p>{formatPrice(price)}</p>
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

  @media (max-width: 1000px) {
    .image {
      width: 120px;
    }
  }
`;
export default BookComponent;
