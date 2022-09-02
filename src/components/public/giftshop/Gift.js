import React from "react";
import styled from "styled-components";
import { useCurrencyContext } from "../../../contexts/currency_context";

const Gift = ({ name, price, images }) => {
  const { priceFormat } = useCurrencyContext();

  return (
    <Wrapper>
      <div className="select">
        <img src={`/${images[0]}`} alt={name} className="image" />
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
  @media (max-width: 650px) {
    margin: 0.1rem;
    .image {
      margin: 0.5rem;
    }
  }
`;

export default Gift;
