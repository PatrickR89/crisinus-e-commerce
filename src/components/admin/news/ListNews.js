import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useLanguageContext } from "../../../contexts/language_context";

import ListLink from "../elements/ListLink";
import ListHead from "../elements/ListHead";

const ListNews = () => {
  const [newsList, setNewsList] = useState([]);
  const { translation } = useLanguageContext();
  const { title, content, date } = translation;
  const titles = ["ID", title, content, date];

  const getNews = () => {
    axios
      .get("/api/news/")
      .then((response) => {
        setNewsList(response.data);
      })
      .catch((error) => {
        const err = `api: /api/news/ [listnews[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const formatDate = (date) => {
    const tempDate = new Date(date);
    const doubleDigit = (num) => {
      return num.toString().padStart(2, "0");
    };
    return [
      doubleDigit(tempDate.getDate()),
      doubleDigit(tempDate.getMonth() + 1),
      tempDate.getFullYear()
    ].join("/");
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <Wrapper>
      <h2>{translation.newsList.toUpperCase()}</h2>
      <ListHead colTitles={titles} />
      {newsList.length > 0 &&
        newsList.map((news, index) => {
          return (
            <ListLink
              key={index}
              index={index}
              cols={4}
              url={`/admin/editnews/${news.id}`}
            >
              <p>{news.id}</p>

              <h4>{news.title}</h4>

              {news.text && <p>{news.text.substring(0, 15)}...</p>}
              <p>{news.date && formatDate(news.date)}</p>
            </ListLink>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export default ListNews;
