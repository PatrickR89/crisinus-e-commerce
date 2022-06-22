import React from "react";
import styled from "styled-components";

import { useItemsContext } from "../contexts/items_context";
import { useFilterContext } from "../contexts/filter_context";
import { useLanguageContext } from "../contexts/language_context";

import { ItemsList } from "../components";
import { PageHero } from "../components/public/elements";
import { Gift, GiftshopFilter } from "../components/public/giftshop";

const GiftshopPage = () => {
    const {
        items_loading: loading,
        items_error: error,
        items_list_length
    } = useItemsContext();
    const { filtered_gifts } = useFilterContext();
    const { translation } = useLanguageContext();

    if (loading) {
        return (
            <div className="loading">
                <h1>{translation.pleaseWait}...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="loading">
                <h1>Unfortunately an error occured</h1>
            </div>
        );
    }

    return (
        <main>
            <PageHero title={translation.giftshop} />
            <Wrapper>
                <GiftshopFilter />
                <ItemsList
                    initialItems={filtered_gifts}
                    SingleItem={Gift}
                    pageItems={items_list_length + 4}
                    url="/giftshop/"
                />
            </Wrapper>
        </main>
    );
};

const Wrapper = styled.div``;

export default GiftshopPage;
