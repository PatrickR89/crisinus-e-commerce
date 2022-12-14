import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import formatDate from "../../../utils/dateFormatting";
import { useItemsContext } from "../../../contexts/items_context";

const SingleNews = ({ title, text, date, id, images }) => {
  const { news_display } = useItemsContext();

  return (
    <Wrapper>
      <div className="image-container">
        <img src={images} alt="" />
      </div>
      <div className="text-container">
        <div className="title">
          <Link to={`/news/${id}`}>
            <h2 style={{ fontSize: `${news_display.news_title}rem` }}>
              {title}
            </h2>
            <div className="underline" />
          </Link>
        </div>
        <div className="paragraph">
          <p>{text.substring(0, news_display.news_length)}...</p>
        </div>
        <div className="date">
          <p style={{ color: "grey" }}>{formatDate(date)}</p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  ${"" /* overflow: hidden; */}
  display: flex;
  flex-direction: row;
  margin: auto;

  p {
    color: var(--clr-par-6);
    margin-bottom: 2rem;
  }
  .paragraph {
    text-align: start;
  }
  .date {
    position: absolute;
    bottom: 2px;
    right: 24px;
    font-size: 0.75rem;
    height: 0.8rem;
  }
  .underline {
    margin-left: 0;
  }

  .text-container {
    min-width: 70%;
  }

  .image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-height: 100%;
      max-width: 100%;
      clip: inherit;
    }
  }
`;

export default SingleNews;
