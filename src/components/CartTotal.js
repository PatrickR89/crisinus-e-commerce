import React from "react";
import styled from "styled-components";
import { useCartContext } from "../contexts/cart_context";
import { useCurrencyContext } from "../contexts/currency_context";
import { useLanguageContext } from "../contexts/language_context";

import { Link } from "react-router-dom";

const CartTotal = () => {
  const { total_amount } = useCartContext();
  const { priceFormat } = useCurrencyContext();
  const { translation } = useLanguageContext();

  return (
    <Wrapper>
      <div className="boxin">
        <h2>
          {translation.total}: {priceFormat(total_amount)}
        </h2>
        <hr />
        <Link to="#" className="btn">
          {translation.order}
        </Link>
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
  h2 {
    margin-bottom: 1rem;
  }
  hr {
    margin-bottom: 1rem;
  }
  a {
    width: 90%;
  }
`;

export default CartTotal;
