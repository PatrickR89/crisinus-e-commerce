import React, { useState } from "react";
import { PageHero, CartContainer, CartModal } from "../components";
import { useLanguageContext } from "../contexts/language_context";

const CartPage = () => {
  const { translation } = useLanguageContext();
  const [isModal, setIsModal] = useState(false);

  return (
    <main>
      <PageHero title={translation.cart} />
      <CartContainer />
      {isModal && <CartModal />}
    </main>
  );
};

export default CartPage;
