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
                <NewsList {...news} />
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
  .single {
    width: 75%;
    padding: 2rem;
  }
  .list {
    width: 25%;
  }
`;

export default News;
