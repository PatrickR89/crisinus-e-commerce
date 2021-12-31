import React from "react";
import { News } from "../components";
import styled from "styled-components";
import { PageHero } from "../components";

const NewsPage = () => {
  return (
    <main>
      <PageHero title="news" />
      <Wrapper>
        <News />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;

  font-size: 1.5rem;
`;

export default NewsPage;
