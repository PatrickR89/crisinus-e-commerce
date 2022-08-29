import React from "react";
import styled from "styled-components";
import { useLanguageContext } from "../../contexts/language_context";
import { useItemsContext } from "../../contexts/items_context";
import { NewsPageComponent } from "../../components/public/news";
import { PageHero } from "../../components/public/elements";
import WhenLoading from "../../components/public/WhenLoading";

const NewsPage = () => {
  const { translation } = useLanguageContext();
  const { items_loading } = useItemsContext();

  if (items_loading) {
    return <WhenLoading />;
  }

  return (
    <main>
      <PageHero title={translation.news} />
      <Wrapper>
        <NewsPageComponent />
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
