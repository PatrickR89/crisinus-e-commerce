import React from "react";
import styled from "styled-components";
import { useItemsContext } from "../contexts/items_context";

import Gift from "./Gift";
import { Link } from "react-router-dom";

const GiftShop = () => {
  const { gifts } = useItemsContext();

  return (
    <Wrapper>
      <ul className="home-gifts">
        {gifts.slice(0, 10).map((gift) => {
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
`;

export default GiftShop;
