import React from "react";
import { PageHero, ItemAmount } from "../components";
import { useCartContext } from "../contexts/cart_context";

const CartPage = () => {
  const { cart, removeItem, clearCart, toggleAmount } = useCartContext();
  console.log(cart);

  const increase = (id) => {
    toggleAmount(id, "inc");
  };
  const decrease = (id) => {
    toggleAmount(id, "dec");
  };

  if (cart.length < 1) {
    return (
      <div>
        <h2>empty cart</h2>
      </div>
    );
  }
  return (
    <main>
      <PageHero title="cart" />
      {cart.map((cartItem) => {
        return (
          <div>
            <h1>{cartItem.name ? `${cartItem.name}` : `${cartItem.title}`}</h1>
            <p>{cartItem.price}</p>
            <ItemAmount
              amount={cartItem.amount}
              increase={() => increase(cartItem.id)}
              decrease={() => decrease(cartItem.id)}
            />
            <button
              className="btn"
              type="button"
              onClick={() => removeItem(cartItem.id)}
            >
              remove
            </button>
          </div>
        );
      })}

      <button className="btn" type="button" onClick={clearCart}>
        clear cart
      </button>
    </main>
  );
};

export default CartPage;
