import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFetchItems } from "../../../hooks/useFetchItems";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useLanguageContext } from "../../../contexts/language_context";
import { useItemsContext } from "../../../contexts/items_context";

const BooksList = ({ initialItems, SingleItem, url, pageItems }) => {
    const { translation } = useLanguageContext();
    const { screen_width } = useItemsContext();

    const [page, setPage] = useState(0);
    const [items, setItems] = useState([]);
    const [nbPages, setNbPages] = useState(0);

    const { loading, data, nextPage, prevPage } = useFetchItems(
        initialItems,
        pageItems,
        setPage
    );

    const { total, loading: loadingIS } = useInfiniteScroll(
        initialItems,
        pageItems,
        setPage,
        page
    );

    useEffect(() => {
        if (screen_width >= 725) {
            if (loading) return;
            setItems(data[page]);
            setNbPages(Math.ceil(initialItems.length / pageItems));
        }
        if (screen_width < 725) {
            if (loadingIS) return;
            setItems(total);
        }
    }, [loading, page, data, pageItems, total]);

    useEffect(() => {
        setPage(0);
    }, [initialItems, pageItems, screen_width]);

    if (initialItems.length < 1 || !items) {
        return (
            <div
                style={{
                    background: "hsl(45, 88%, 60%)",
                    padding: "1rem 0",
                    marginTop: "-2rem"
                }}
            >
                <h2>{translation.noProducts}...</h2>
            </div>
        );
    }

    return (
        <Wrapper>
            {!loading &&
                initialItems.length > pageItems &&
                screen_width >= 725 && (
                    <div className="btn-container">
                        <button className="btn" onClick={prevPage}>
                            {translation.prev}
                        </button>
                        <p>{`${page + 1} / ${nbPages}`}</p>
                        <button className="btn" onClick={nextPage}>
                            {translation.next}
                        </button>
                    </div>
                )}
            <ul className="home-books">
                {items.map((item) => {
                    return (
                        <li key={item.id}>
                            <Link to={`${url}${item.id}`}>
                                <SingleItem {...item} />
                            </Link>
                        </li>
                    );
                })}
            </ul>
            {/* {loadingIS && <p>loading...</p>} */}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100%;
    .home-books {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-items: start;
        justify-content: space-between;
        margin: 1rem;
    }
    .btn-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }
    .btn {
        padding: 0.375rem 2.5rem;
    }
    @media (max-width: 1000px) {
        .home-books {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    @media (max-width: 725px) {
        .home-books {
            grid-template-columns: repeat(2, 1fr);
        }
        .btn {
            padding: 0.375rem 0.5rem;
        }
    }
    @media (max-width: 360px) {
        .home-books {
            grid-template-columns: repeat(1, 1fr);
        }
    }
`;

export default BooksList;
