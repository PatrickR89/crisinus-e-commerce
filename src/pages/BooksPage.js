import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

import { BookInBooks, BooksSidebar } from "../components/public/books";
import { FilterItems, ItemsList } from "../components";
import { PageHero } from "../components/public/elements";
import { useItemsContext } from "../contexts/items_context";
import { useFilterContext } from "../contexts/filter_context";
import { useLanguageContext } from "../contexts/language_context";
import { useSidebarContext } from "../contexts/sidebar_context";

const BooksPage = () => {
    const {
        items_loading: loading,
        items_error: error,
        items_list_length
    } = useItemsContext();
    const { filtered_books } = useFilterContext();
    const { translation } = useLanguageContext();
    const { openSidebarBooks } = useSidebarContext();

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
            <PageHero title={translation.books} />
            <FilterContainer>
                <div className="toggle-disp">
                    <FilterItems />
                </div>
                <div className="toggle-side">
                    <IconButton onClick={openSidebarBooks}>
                        <SearchIcon />
                    </IconButton>
                </div>
            </FilterContainer>
            <Wrapper>
                <BooksSidebar />
                <ItemsList
                    initialItems={filtered_books}
                    SingleItem={BookInBooks}
                    pageItems={items_list_length}
                    url="/books/"
                />
            </Wrapper>
        </main>
    );
};

const Wrapper = styled.div`
    height: 100%;
`;

const FilterContainer = styled.div`
    background: var(--clr-button-3);
    padding: 0.5rem 0;
    margin-top: -2rem;
    margin-bottom: 2rem;
`;

export default BooksPage;
