import React from "react";
import styled from "styled-components";
import { useCartContext } from "../contexts/cart_context";
import { Link } from "react-router-dom";
import priceFormat from "../utils/priceFormat";

const CartTotal = () => {
  const { total_amount } = useCartContext();
  return (
    <Wrapper>
      <div className="boxin">
        <h2>Total amount: {priceFormat(total_amount)}</h2>
        <hr />
        <Link to="#" className="btn">
          Order
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
