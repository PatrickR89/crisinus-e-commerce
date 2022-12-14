import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useItemsContext } from "../../../contexts/items_context";
import formatDate from "../../../utils/dateFormatting";

const NewsPageComponent = () => {
  const { news, news_display } = useItemsContext();

  return (
    <Wrapper>
      {news.map((n, index) => {
        return (
          <div
            className="news-container"
            style={{
              heigth: `${news_display.news_heigth}rem`,
              width: `${news_display.news_width}vw`
            }}
            key={index}
          >
            <div className="image-container">
              {n.images[0] && <img src={`/${n.images[0]}`} alt={n.title} />}
            </div>
            <div className="news-text">
              <div className="text-container">
                {index === 0 && <hr />}
                <Link to={`/news/${n.id}`}>
                  <h2
                    style={{
                      fontSize: `${news_display.news_title}rem`
                    }}
                  >
                    {n.title}
                  </h2>
                </Link>
                <p className="news-paragraph">
                  {n.text.substring(0, news_display.news_length)}
                  ...
                </p>
              </div>
              <div>
                <p className="date-muted">{formatDate(n.date)}</p>
                <hr />
              </div>
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .news-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    margin: 1rem 2rem 1rem 1rem;
  }
  .image-container {
    margin: auto;
    width: 20%;
    height: 100%;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .news-text {
    display: flex;
    flex-direction: column;
    width: 74%;
    height: 100%;

    h2 {
      text-align: start;
      margin-bottom: 0.5rem;
    }
  }
  .date-muted {
    text-align: end;
    color: var(--clr-primary-5);
  }
  .news-paragraph {
    text-align: start;
    min-width: 100%;
    height: 100%;
  }
  .text-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-betwen;
    height: 100%;
    margin: 0.1rem;
  }

  @media (max-width: 750px) {
    .image-container {
      display: none;
    }
    .news-text {
      width: 100%;
    }
  }
`;

export default NewsPageComponent;
