import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SingleNews, NewsList } from "../components";
import mockNews from "../mockData/mockNews";

const News = () => {
  const [singleNews, setSingleNews] = useState(mockNews[0]);
  const [newId, setNewId] = useState(1);

  const handleChange = (id) => {
    setNewId(id);
  };
  useEffect(() => {
    const tempNews = mockNews.filter((item) => item.id === newId);
    setSingleNews(tempNews[0]);
  }, [newId]);

  return (
    <Wrapper>
      <div className="single">
        <SingleNews {...singleNews} />
      </div>
      <div className="list">
        <ul>
          {mockNews.map((news) => {
            const { id } = news;
            return (
              <li key={id} onClick={() => handleChange(id)}>
                <div className="li-item select">
                  <NewsList {...news} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin: 2rem 2rem;
  .single {
    width: 74%;
    height: 100%;
  }
  .list {
    width: 24%;
    height: 100%;
  }
  .li-item {
    transition: 0.1s ease-in;
    text-transform: capitalize;
  }
`;

export default News;
