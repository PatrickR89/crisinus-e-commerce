import React from "react";
import { News } from "../components";
import styled from "styled-components";
import { PageHero } from "../components";
import { useLanguageContext } from "../contexts/language_context";

const NewsPage = () => {
  const { translation } = useLanguageContext();

  return (
    <main>
      <PageHero title={translation.news} />
      <Wrapper>
        <News page={true} />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  height: 65vh;
  margin: 1rem;
`;

export default NewsPage;
