import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { SingleNews } from "../news";
import { useItemsContext } from "../../../contexts/items_context";

const News = ({ home }) => {
  const { news } = useItemsContext();

  const [tempIndex, setTempIndex] = useState(0);

  useEffect(() => {
    if (home && news.length) {
      const indexTimeout = setTimeout(() => {
        if (tempIndex > 0) {
          setTempIndex(tempIndex - 1);
        } else {
          setTempIndex(news.length - 1);
        }
      }, 8000);
      setCurrentNews(tempIndex);
      return () => {
        clearTimeout(indexTimeout);
      };
    }
  }, [tempIndex, news]);

  function setCurrentNews(index) {
    var nextNewsIndex = index + 1;
    if (nextNewsIndex > news.length - 1) {
      nextNewsIndex = 0;
    }

    var previousNewsIndex = index - 1;
    if (previousNewsIndex < 0) {
      previousNewsIndex = news.length - 1;
    }
    let previousNews = document.getElementById(`${news[nextNewsIndex].id}`);
    let currentNews = document.getElementById(`${news[index].id}`);
    let nextNews = document.getElementById(`${news[previousNewsIndex].id}`);

    previousNews.classList.remove("active");
    previousNews.classList.remove("right");
    previousNews.classList.add("left");

    nextNews.classList.add("right");
    nextNews.classList.remove("left");
    nextNews.classList.remove("active");

    currentNews.classList.remove("right");
    currentNews.classList.remove("left");
    currentNews.classList.add("active");

    setTimeout(() => {
      previousNews.classList.add("hide");
      nextNews.classList.remove("hide");
    }, 900);
  }

  return (
    <main>
      <Wrapper>
        <ul className="n-page single single-home">
          {news.map((singleNews) => {
            return (
              <li
                key={singleNews.id}
                id={singleNews.id}
                className="li-item right"
              >
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
    left: 65vw;
  }
  .active {
    left: 0;
  }
  .left {
    left: -65vw;
  }

  .hide {
    display: none;
  }

  .single-home {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    margin: 1.4rem;
  }

  .li-item {
    width: 100%;
    transition: 1s linear;
    position: absolute;
  }
  .n-page {
    font-size: 1rem;
  }
  @media (max-width: 1800px) {
    .right {
      left: 100vw;
    }
    .left {
      left: -100vw;
    }
  }
  @media (max-width: 1400px) and (orientation: portrait) {
    height: 20vh !important;
  }
  @media (max-width: 1250px) {
    height: 46vh;
    .single {
      width: 100%;
      margin: auto;
    }
  }

  @media (max-width: 650px) {
    height: 35vh;
    .single {
      width: 85%;
    }
    .right {
      left: 80vw;
    }
    .left {
      left: -80vw;
    }
  }
  @media (max-width: 550px) and (orientation: portrait) {
    height: 30vh !important;
  }
  @media (max-height: 450px) {
    height: 45vh;
  }
`;

export default News;
