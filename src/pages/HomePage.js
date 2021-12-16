import React from "react";
import styled from "styled-components";
import { News, GiftShop, OurBooks } from "../components";

const HomePage = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="col">
          <News />
        </div>
        <div className="col">
          <OurBooks />
        </div>
        <div className="col">
          <GiftShop />
        </div>
        <div className="col"></div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 8rem);
  .container {
    display: block;
    width: 90vw;
    align-items: stretch;
    height: 100%;
  }
  .col {
    ${"" /* height: 25%; */}
    border-bottom: 1px solid var(--clr-primary-6);
    width: 90vw;
  }
`;

export default HomePage;
