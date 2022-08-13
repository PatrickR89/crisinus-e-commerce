import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import formatDate from "../../../utils/dateFormatting";
import { useItemsContext } from "../../../contexts/items_context";

const SingleNews = ({ title, text, date, id }) => {
    const { news_display } = useItemsContext();

    const Title = styled.h2`
        font-size: ${news_display.news_title}rem;
    `;

    return (
        <Wrapper>
            <div className="title">
                <Link to={`/news/${id}`}>
                    <Title>{title}</Title>
                    <div className="underline" />
                </Link>
            </div>
            <div className="paragraph">
                <p>{text.substring(0, news_display.news_length)}...</p>
            </div>
            <div className="date">
                <p style={{ color: "grey" }}>{formatDate(date)}</p>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  height: 100%;
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
`;

export default SingleNews;
