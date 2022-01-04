import React from "react";
import { PageHero, CartContainer } from "../components";
import { useCartContext } from "../contexts/cart_context";

const CartPage = () => {
  const { cart } = useCartContext();

  return (
    <main>
      <PageHero title="cart" />
      <CartContainer />
    </main>
  );
};

export default CartPage;
