import React from "react";
import { PageHero } from "../components/public/elements";
import { CartContainer, CartModal } from "../components/public/cart";
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
