import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLanguageContext } from "../../../contexts/language_context";

import { ListHead, ListLink, ListWrapper } from "../elements";
import { useNewsContext } from "../../../contexts/admin/news_context";

const ListNews = () => {
  const { getNewsList, formatDate, newsList, loading, error } =
    useNewsContext();
  const { translation } = useLanguageContext();
  const { title, content, date } = translation;
  const titles = ["ID", title, content, date];

  useEffect(() => {
    getNewsList();
  }, []);

  if (loading) {
    return (
      <main>
        <h2>Please wait, loading...</h2>
      </main>
    );
  }

  return (
    <ListWrapper>
      <h2>{translation.newsList.toUpperCase()}</h2>
      <ListHead colTitles={titles} />
      {newsList.length > 0 &&
        newsList.map((news, index) => {
          return (
            <ListLink
              key={index}
              index={index}
              cols={4}
              url={`/admin/news/${news.id}`}
            >
              <p>{news.id}</p>

              <h4>{news.title}</h4>

              {news.text && <p>{news.text.substring(0, 15)}...</p>}
              <p>{news.date && formatDate(news.date)}</p>
            </ListLink>
          );
        })}
    </ListWrapper>
  );
};

export default ListNews;
