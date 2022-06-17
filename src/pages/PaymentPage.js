import React from "react";
import { PageHero, Info } from "../components";
import { useLanguageContext } from "../contexts/language_context";
import { useItemsContext } from "../contexts/items_context";

const PaymentPage = () => {
    const { translation } = useLanguageContext();
    const { informations } = useItemsContext();

    return (
        <main>
            <PageHero title={translation.paymentAndShipping} />
            <Info {...informations[2]} />
        </main>
    );
};

export default PaymentPage;
