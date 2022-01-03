import React from "react";
import styled from "styled-components";
import priceFormat from "../utils/priceFormat";

const Gift = ({ name, price, images }) => {
  return (
    <Wrapper>
      <div className="select">
        <img src={images[0]} alt={name} className="image" />
        <h4 className="title">{name}</h4>
        <p>{priceFormat(price)}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0.5rem;
  .image {
    margin: 1rem;
    width: 150px;
  }
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
`;

export default Gift;
