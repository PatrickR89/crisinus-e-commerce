import React from "react";
import { Info } from "../components";
import { PageHero } from "../components/public/elements";
import { useLanguageContext } from "../contexts/language_context";
import { useItemsContext } from "../contexts/items_context";

const AboutUsPage = () => {
    const { translation } = useLanguageContext();
    const { informations } = useItemsContext();

    return (
        <main>
            <PageHero title={translation.aboutUs} />
            <Info {...informations[3]} />
        </main>
    );
};

export default AboutUsPage;
