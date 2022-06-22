import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useItemsContext } from "../contexts/items_context";
import BookComponent from "./BookComponent";
import shuffle from "../utils/shuffleItems";

const OurBooks = () => {
    const { books, home_page_items } = useItemsContext();

    let tempBooks = books;

    useEffect(() => {
        shuffle(tempBooks);
    }, []);

    return (
        <Wrapper>
            <ul className="home-books">
                {tempBooks.slice(0, home_page_items).map((book) => {
                    return (
                        <li key={book.id}>
                            <Link to={`/books/${book.id}`}>
                                <BookComponent {...book} />
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background: var(--clr-button-5);
    padding: 2rem;
    .home-books {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        align-items: start;
        justify-content: space-between;
        margin: 0.5rem;
    }
    @media (max-width: 1000px) {
        .home-books {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    @media (max-width: 650px) {
        padding: 0.5rem;
        .home-books {
            grid-template-columns: repeat(2, 1fr);
            justify-content: center;
        }
    }
`;

export default OurBooks;
