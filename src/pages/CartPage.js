import React from "react";
import { PageHero, CartContainer } from "../components";
import { useLanguageContext } from "../contexts/language_context";

const CartPage = () => {
  const { translation } = useLanguageContext();

  return (
    <main>
      <PageHero title={translation.cart} />
      <CartContainer />
    </main>
  );
};

export default CartPage;
