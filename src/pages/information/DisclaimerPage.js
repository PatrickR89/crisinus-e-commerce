import React from "react";
import { Info } from "../../components/public/info";
import { PageHero } from "../../components/public/elements";
import { useLanguageContext } from "../../contexts/language_context";
import { useItemsContext } from "../../contexts/items_context";

const DisclaimerPage = () => {
    const { translation } = useLanguageContext();
    const { informations } = useItemsContext();

    return (
        <main>
            <PageHero title={translation.disclaimer} />
            <Info {...informations[4]} />
        </main>
    );
};

export default DisclaimerPage;
