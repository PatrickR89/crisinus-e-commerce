import React from "react";
import { News } from "../components";
import styled from "styled-components";
import { PageHero } from "../components";
import { FaRegNewspaper } from "react-icons/fa";
import { useLanguageContext } from "../contexts/language_context";
import { useItemsContext } from "../contexts/items_context";
import { useSidebarContext } from "../contexts/sidebar_context";

const NewsPage = () => {
  const { translation } = useLanguageContext();
  const { single_item_loading } = useItemsContext();
  const { openSidebarAR } = useSidebarContext();

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
      <ToggleNews>
        <button className="btn" onClick={openSidebarAR}>
          <FaRegNewspaper />
        </button>
      </ToggleNews>
      <Wrapper>
        <News newsPage={true} />
      </Wrapper>
    </main>
  );
};

const ToggleNews = styled.div`
  height: 5vh;
  width: 100%;
  background-color: var(--clr-button-3);
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: -2rem;
  margin-bottom: 1rem;
  .btn {
    box-shadow: none;
    height: 100%;
    width: 35%;
    font-size: 1.5rem;
  }
  @media (min-width: 1000px) {
    display: none !important;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  height: 65vh;
  margin: 1rem;
`;

export default NewsPage;
