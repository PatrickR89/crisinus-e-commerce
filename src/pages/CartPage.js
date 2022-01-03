import React from "react";
import { PageHero, CartContainer } from "../components";
import { useCartContext } from "../contexts/cart_context";

const CartPage = () => {
  const { cart } = useCartContext();

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
      <CartContainer />
    </main>
  );
};

export default CartPage;
