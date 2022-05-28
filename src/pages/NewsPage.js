import React from "react";
import { News } from "../components";
import styled from "styled-components";
import { PageHero } from "../components";
import { useLanguageContext } from "../contexts/language_context";
import { useItemsContext } from "../contexts/items_context";

const NewsPage = () => {
  const { translation } = useLanguageContext();
  const { single_item_loading } = useItemsContext();

  if (single_item_loading) {
    return (
      <div className="loading">
        <h1>{translation.pleaseWait}...</h1>
      </div>
    );
  }

  return (
    <main>
      <PageHero title={translation.news} />
      <Wrapper>
        <News newsPage={true} />
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
