import React, { useState } from "react";
import { PageHero, CartContainer, CartModal } from "../components";
import { useLanguageContext } from "../contexts/language_context";
import { useCartContext } from "../contexts/cart_context";

const CartPage = () => {
  const { translation } = useLanguageContext();
  const { isModalOpen } = useCartContext();

  return (
    <main>
      <PageHero title={translation.cart} />
      <CartContainer />
      {isModalOpen && <CartModal />}
    </main>
  );
};

export default CartPage;
