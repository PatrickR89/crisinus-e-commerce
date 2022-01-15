import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ItemAmount } from "../components";
import { useCartContext } from "../contexts/cart_context";
import { useLanguageContext } from "../contexts/language_context";

const AddToCart = ({ product }) => {
  const { translation } = useLanguageContext();
  const { addToCart } = useCartContext();
  const { id, stock } = product;
  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((prevAmount) => {
      let newAmount = prevAmount + 1;
      if (newAmount > stock) {
        newAmount = stock;
      }
      return newAmount;
    });
  };

  const decrease = () => {
    setAmount((prevAmount) => {
      let newAmount = prevAmount - 1;
      if (newAmount < 1) {
        newAmount = 1;
      }
      return newAmount;
    });
  };

  return (
    <Wrapper>
      <ItemAmount
        amount={amount}
        increase={increase}
        decrease={decrease}
        stock={stock}
      />
      <Link
        to="/cart"
        className="btn"
        onClick={() => addToCart(id, amount, product)}
      >
        {translation.addToCart}
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 2rem;
  a {
    margin: 0.5rem;
    padding: 0.5rem 4.5rem;
    font-weight: bold;
    max-width: 14rem;
  }
`;

export default AddToCart;
