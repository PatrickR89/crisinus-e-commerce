import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { PageHero } from "../components";
import { useLanguageContext } from "../contexts/language_context";
import { useItemsContext } from "../contexts/items_context";

const NewsExpandedPage = () => {
  const { id } = useParams();

  const { translation } = useLanguageContext();
  const { changeNews, single_news } = useItemsContext();
  console.log(single_news);
  useEffect(() => {
    const idInt = parseInt(id);
    changeNews(idInt);
  }, []);

  return (
    <main>
      <PageHero title={single_news.title} adress={translation.news} />
      <Wrapper>
        <div className="title">
          <h2>{single_news.title}</h2>
          <p>{single_news.date}</p>
        </div>
        <p className="news-text">
          {single_news.images[0] && (
            <img src={single_news.images[0]} alt={single_news.title} />
          )}
          {single_news.text}
        </p>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .news-text {
    text-align: start;
  }
`;

export default NewsExpandedPage;
