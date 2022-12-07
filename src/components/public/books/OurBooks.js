import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useItemsContext } from "../../../contexts/items_context";
import { useLanguageContext } from "../../../contexts/language_context";
import {
  SectionLinkContainer,
  SectionTitle
} from "../elements/SectionElements";
import BookComponent from "./BookComponent";
import shuffle from "../../../utils/shuffleItems";

const OurBooks = () => {
  const { books, home_page_items } = useItemsContext();
  const { translation } = useLanguageContext();

  let tempBooks = books;

  useEffect(() => {
    shuffle(tempBooks);
  }, []);

  return (
    <Wrapper>
      <SectionTitle>{translation.ourBooks}</SectionTitle>
      <ul className="home-books">
        {tempBooks?.length !== undefined &&
          tempBooks.slice(0, home_page_items).map((book) => {
            return (
              <li key={book.id}>
                <Link to={`/books/${book.id}`}>
                  <BookComponent {...book} />
                </Link>
              </li>
            );
          })}
      </ul>
      <SectionLinkContainer>
        <Link to="/books" className="section-link">
          {translation.seeAll}
        </Link>
      </SectionLinkContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: var(--clr-button-5);
  padding: 1rem 2rem 2rem 2rem;

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

  @media (hover) {
    .section-link::after,
    .section-link::before {
      transform: scaleX(0);
    }
  }
`;

export default OurBooks;
