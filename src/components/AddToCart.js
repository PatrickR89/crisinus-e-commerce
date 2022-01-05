import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ItemAmount } from "../components";
import { useCartContext } from "../contexts/cart_context";

const AddToCart = ({ product }) => {
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
        add to cart
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  a {
    margin: 1rem;
    padding: 0.5rem 4.5rem;
    font-weight: bold;
  }
`;

export default AddToCart;
