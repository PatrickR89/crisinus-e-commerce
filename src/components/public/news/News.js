import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { SingleNews } from "../news";
import { useItemsContext } from "../../../contexts/items_context";

const News = ({ newsPage, home }) => {
  const { fetchSingleNews, news, single_news } = useItemsContext();

  const [tempIndex, setTempIndex] = useState(0);
  var newsArray = [];

  useEffect(() => {
    if (home && news.length) {
      news.forEach((singleNews) => {
        newsArray.push(singleNews.id);
      });
      console.log(newsArray);
      const indexTimeout = setTimeout(() => {
        if (tempIndex > 0) {
          setTempIndex(tempIndex - 1);
        } else {
          setTempIndex(news.length - 1);
        }
      }, 10000);
      fetchSingleNews(news[tempIndex].id);
      return () => {
        clearTimeout(indexTimeout);
      };
    }
  }, [tempIndex, news]);

  return (
    <main>
      <Wrapper>
        <ul className="n-page single single-home">
          {news.map((singleNews) => {
            return (
              <li key={singleNews.id} className="li-item right">
                <SingleNews {...singleNews} />
              </li>
            );
          })}
        </ul>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 27vh;

  .right {
    left: 63vw;
  }
  .active {
    left: 0;
  }
  .left {
    left: -63vw;
  }

  .single-home {
    height: 100%;
    width: 100%;
    ${"" /* overflow: hidden; */}
    position: relative;
    margin: 1.4rem;
  }

  .li-item {
    width: 100%;
    transition: 0.1s ease-in;
    position: absolute;
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
