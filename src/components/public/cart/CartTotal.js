import React from "react";
import styled from "styled-components";
import { useCartContext } from "../../../contexts/cart_context";
import { useLanguageContext } from "../../../contexts/language_context";
import formatPrice from "../../../utils/formatPrice";

const CartTotal = () => {
  const { total_amount, openModal, postalFee } = useCartContext();
  const { translation } = useLanguageContext();

  return (
    <Wrapper>
      <div className="boxin">
        <div className="amount">
          <h2>
            {translation.total}: {formatPrice(total_amount)}
          </h2>
          <h4>
            {translation.postalFee}:{" "}
            {postalFee ? `${formatPrice(200)}` : `${translation.free}`}
          </h4>
          <p>
            {" "}
            {postalFee
              ? `(${translation.postalFeeLimit} ${formatPrice(2700)})`
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
