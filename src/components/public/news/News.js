import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { SingleNews } from "../news";
import { useItemsContext } from "../../../contexts/items_context";

const News = ({ newsPage, home }) => {
  const { fetchSingleNews, news, single_news } = useItemsContext();

  const [tempIndex, setTempIndex] = useState(0);
  const [listItems, setListItems] = useState([]);
  const [newsArray, setNewsArray] = useState([]);

  useEffect(() => {
    // news.forEach((singleNews) => {
    //   setNewsArray([...newsArray, singleNews.id]);
    // });
    // console.log(newsArray);
    let documentLIs = document.querySelectorAll(".li-item");
    setListItems(documentLIs);
  }, []);

  useEffect(() => {
    if (home && news.length) {
      let documentLIs = document.querySelectorAll(".li-item");
      setListItems(documentLIs);
      const indexTimeout = setTimeout(() => {
        if (tempIndex > 0) {
          setTempIndex(tempIndex - 1);
        } else {
          setTempIndex(news.length - 1);
        }
      }, 8000);
      // fetchSingleNews(news[tempIndex].id);
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
    console.log(currentNews);
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
    left: 63vw;
  }
  .active {
    left: 0;
  }
  .left {
    left: -63vw;
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
    transition: 1s ease-in;
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
