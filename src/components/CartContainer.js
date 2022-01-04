import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaRegTimesCircle } from "react-icons/fa";
import { CartItem, CartTotal } from "../components";
import { useCartContext } from "../contexts/cart_context";

const CartContainer = () => {
  const { cart, clearCart } = useCartContext();

  if (cart.length < 1) {
    return (
      <div>
        <h2>empty cart</h2>
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="fields">
        <div className="item-name itm">
          <p>name</p>
        </div>
        <div className="item-col itm">
          <p>price</p>
        </div>
        <div className="item-col itm">
          <p>amount</p>
        </div>
        <div className="item-col itm">
          <p>subtotal</p>
        </div>
        <div className="itm item-remove">
          <button className=" btn btn-remove" onClick={clearCart}>
            <FaRegTimesCircle />
          </button>
        </div>
      </div>
      <hr />
      <div className="itm-list">
        {cart.map((cartItem, index) => {
          return (
            <div
              className={
                index % 2 === 0 ? "itm-background-one" : "itm-background-two"
              }
            >
              <CartItem key={cartItem.id} {...cartItem} />
            </div>
          );
        })}
      </div>
      <div className="btn-container">
        <div>
          <Link to="/books" className="btn">
            shop more books
          </Link>
          <Link to="/giftshop" className="btn">
            shop more gifts
          </Link>
        </div>
      </div>
      <div className="totals">
        <CartTotal />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  .fields {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
  }
  .item-name {
    width: 35%;
  }
  .item-col {
    width: 20%;
  }
  .item-remove {
    width: 5%;
    svg {
      font-size: 1.5rem;
    }
  }
  .itm {
    text-transform: uppercase;
    font-size: 1.2rem;
    color: var(--clr-title-1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .itm-background-one {
    background: var(--clr-primary-8);
  }
  .itm-background-two {
    background: var(--clr-button-6);
  }
  .itm-list {
    margin-bottom: 2rem;
  }
  .clr {
    background: var(--clr-par-6);
    color: var(--clr-primary-7);
  }
  .clr:hover {
    background: var(--clr-clear-hover);
  }
  .btn-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    div {
      a {
        margin: 0 1rem;
      }
    }
  }
  .totals {
    display: flex;
    align-items: center;
    justify-content: end;
    margin: 2rem 1rem;
  }
  .btn-remove {
    background: transparent;
    box-shadow: none;
    font-size: 1.5rem;
    color: var(--clr-par-6);
  }
  .btn-remove:hover {
    color: var(--clr-clear-hover);
  }
`;

export default CartContainer;
