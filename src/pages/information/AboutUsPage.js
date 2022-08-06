import React, { useEffect } from "react";
import { Info } from "../../components/public/info";
import { PageHero } from "../../components/public/elements";
import { useLanguageContext } from "../../contexts/language_context";
import { useItemsContext } from "../../contexts/items_context";

const AboutUsPage = () => {
    const { translation } = useLanguageContext();
    const { current_info, fetchInfo, single_item_loading } = useItemsContext();

    useEffect(() => {
        fetchInfo("about_us");
    }, []);

    if (single_item_loading) {
        return (
            <main>
                <h2>Please wait...</h2>
            </main>
        );
    }

    return (
        <main>
            <PageHero title={translation.aboutUs} />
            <Info {...current_info} />
        </main>
    );
};

export default AboutUsPage;
