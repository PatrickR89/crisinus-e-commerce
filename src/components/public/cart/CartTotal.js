import React from "react";
import styled from "styled-components";
import { useCartContext } from "../../../contexts/cart_context";
import { useCurrencyContext } from "../../../contexts/currency_context";
import { useLanguageContext } from "../../../contexts/language_context";

const CartTotal = () => {
  const { total_amount, openModal, postalFee } = useCartContext();
  const { priceFormat } = useCurrencyContext();
  const { translation } = useLanguageContext();

  return (
    <Wrapper>
      <div className="boxin">
        <div className="amount">
          <h2>
            {translation.total}: {priceFormat(total_amount)}
          </h2>
          <h4>
            {translation.postalFee}:{" "}
            {postalFee ? `${priceFormat(1500)}` : `${translation.free}`}
          </h4>
          <p>
            {" "}
            {postalFee
              ? `(${translation.postalFeeLimit} ${priceFormat(20000)})`
              : ``}
          </p>
        </div>
        <hr />
        <button className="btn" onClick={openModal}>
          {translation.order}
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .boxin {
    border: 1px solid var(--clr-primary-2);
    padding: 2rem;
    background: var(--clr-button-6);
  }
  .amount {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  h2 {
    margin-bottom: 0.5rem;
  }
  hr {
    margin-bottom: 1rem;
  }
  button {
    width: 90%;
  }
  @media (max-width: 900px) {
    width: 100%;
    .boxin {
      margin: auto;
    }
  }
`;

export default CartTotal;
