import React, { useEffect } from "react";

import { useLanguageContext } from "../../../contexts/language_context";

import { ListHead, ListLink, ListWrapper } from "../elements";
import { useNewsContext } from "../../../contexts/admin/news_context";
import WhenLoading from "../../public/WhenLoading";
import WhenError from "../../public/WhenError";

const ListNews = () => {
  const { getNewsList, formatDate, newsList, loading, error, clearError } =
    useNewsContext();
  const { translation } = useLanguageContext();
  const { title, content, date } = translation;
  const titles = ["ID", title, content, date];

  useEffect(() => {
    getNewsList();
  }, []);

  if (loading) {
    return <WhenLoading />;
  }

  if (error) {
    return <WhenError handleError={clearError} />;
  }

  return (
    <ListWrapper>
      <h2>{translation.newsList.toUpperCase()}</h2>
      <ListHead colTitles={titles} />
      {Array.isArray(newsList) &&
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
