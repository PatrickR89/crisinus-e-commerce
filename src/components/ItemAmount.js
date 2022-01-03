import React from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

const ItemAmount = ({ amount, increase, decrease }) => {
  return (
    <Wrapper>
      <button className="btn" type="button" onClick={decrease}>
        <FaMinus />
      </button>
      <h3 className="amount">{amount}</h3>
      <button className="btn" type="button" onClick={increase}>
        <FaPlus />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  background: var(--clr-button-5);
  .btn {
    padding: 0.5rem 1.75rem;
    height: 100%;
    box-shadow: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .amount {
    padding: 0.5rem 2rem;
  }
`;

export default ItemAmount;
