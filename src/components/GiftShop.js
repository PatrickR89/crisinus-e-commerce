import React from "react";
import styled from "styled-components";
import { useItemsContext } from "../contexts/items_context";

import Gift from "./Gift";
import { Link } from "react-router-dom";

const GiftShop = () => {
  const { gifts, home_page_items } = useItemsContext();

  return (
    <Wrapper>
      <ul className="home-gifts">
        {gifts.slice(0, home_page_items).map((gift) => {
          return (
            <li key={gift.id}>
              <Link to={`/giftshop/${gift.id}`}>
                <Gift {...gift} />
              </Link>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
  .home-gifts {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: start;
    justify-content: space-between;
    margin: 0.5rem;
  }
  @media (max-width: 1000px) {
    .home-gifts {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 650px) {
    .home-gifts {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default GiftShop;
