import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { SingleNews, ListMenu, SidebarAR } from "../components";
import { useFetchItems } from "../hooks/useFetchItems";

import { useLanguageContext } from "../contexts/language_context";
import { useItemsContext } from "../contexts/items_context";

const News = ({ newsPage, home }) => {
  const { translation } = useLanguageContext();
  const { changeNews, news, newsID, single_news, single_item_loading } =
    useItemsContext();

  const [tempIndex, setTempIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);

  const { loading, data, prevPage, nextPage } = useFetchItems(news, 5, setPage);

  useEffect(() => {
    if (loading) return;
    setItems(data[page]);
  }, [loading, page, data]);

  useEffect(() => {
    if (home && news.length) {
      setTimeout(() => {
        if (tempIndex > 0) {
          setTempIndex(tempIndex - 1);
        } else {
          setTempIndex(news.length - 1);
        }
      }, 5000);
      changeNews(news[tempIndex].id);
    }
  }, [tempIndex, news]);

  if (!news) {
    return <div></div>;
  }

  if (single_item_loading) {
    return (
      <div className="loading">
        <h1>{translation.pleaseWait}...</h1>
      </div>
    );
  }

  if (home) {
    return (
      <main>
        <Wrapper>
          <div className="single-home">
            <SingleNews {...single_news} />
          </div>
        </Wrapper>
      </main>
    );
  }

  return (
    <main>
      <Wrapper>
        <div className={newsPage ? "n-page single" : "single-home"}>
          <SingleNews {...single_news} />
        </div>
        <ListMenu
          items={items}
          prevPage={prevPage}
          nextPage={nextPage}
          itemChange={changeNews}
          itemCriteria={newsID}
          length={news.length}
          byId={true}
        />
      </Wrapper>
      <SidebarAR
        items={items}
        prevPage={prevPage}
        nextPage={nextPage}
        title={translation.news}
        ver="news"
      />
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  .single {
    width: 74%;
    height: 100%;
    overflow: auto;
    position: relative;
  }
  .single-home {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
    margin: 0.5rem;
  }
  .list {
    width: 24%;
    height: 100%;
    overflow: auto;
  }
  .li-item {
    transition: 0.1s ease-in;
    text-transform: capitalize;
  }
  .n-page {
    font-size: 1rem;
  }
  @media (max-width: 1000px) {
    .single {
      width: 100%;
      margin: auto;
    }
  }
  @media (max-width: 650px) {
    .single {
      width: 85%;
    }
    .list {
      width: 15%;
    }
  }
`;

export default News;
