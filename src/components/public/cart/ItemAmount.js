import React from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

const ItemAmount = ({ amount, increase, decrease, stock }) => {
  return (
    <Wrapper>
      <button
        className={amount <= 1 ? "btn-amount amount-disabled" : "btn-amount"}
        type="button"
        onClick={decrease}
      >
        <FaMinus />
      </button>
      <h3 className="amount">{amount}</h3>
      <button
        className={
          amount >= stock ? "btn-amount amount-disabled" : "btn-amount"
        }
        type="button"
        onClick={increase}
      >
        <FaPlus />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  background: var(--clr-button-5);
  .btn-amount {
    padding: 0.5rem 1.75rem;
    height: 100%;
    box-shadow: none;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--clr-button-1);
    font-size: 1.5rem;
  }
  .btn-amount:hover {
    color: var(--clr-button-3);
  }
  .amount-disabled {
    color: var(--clr-button-4);
  }
  .amount-disabled:hover {
    color: var(--clr-button-5);
  }
  .amount {
    padding: 0.5rem 1rem;
  }
`;

export default ItemAmount;
