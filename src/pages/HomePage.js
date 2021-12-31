import React from "react";
import styled from "styled-components";
import { News, GiftShop, OurBooks, PageHero, HomeBottom } from "../components";

const HomePage = () => {
  return (
    <main>
      <PageHero />
      <Wrapper>
        <div className="container">
          <div className="col news">
            <News />
          </div>
          <div className="col">
            <OurBooks />
          </div>
          <div className="col">
            <GiftShop />
          </div>
          <div className="col">
            <HomeBottom />
          </div>
        </div>
      </Wrapper>
    </main>
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
    ${"" /* border-bottom: 1px solid var(--clr-primary-6); */}
    width: 100%;
    padding-bottom: 1rem;
    .news {
      .title {
        font-size: 0.8rem;
        margin-bottom: 0.2rem;
      }
    }
  }
`;

export default HomePage;
