import React from "react";
import styled from "styled-components";

const SingleNews = ({ title, text, date }) => {
  return (
    <Wrapper>
      <div className="title">
        <h2>{title}</h2>
        <div className="underline" />
      </div>
      <div className="paragraph">
        <p>{text.substring(0, 500)}</p>
      </div>
      <div className="date">
        <p style={{ color: "grey" }}>{date}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  p {
    color: var(--clr-par-6);
  }
  .paragraph {
    text-align: start;
  }
  .date {
    position: absolute;
    bottom: 0px;
    right: 24px;
    font-size: 0.75rem;
  }
  .underline {
    margin-left: 0;
`;

export default SingleNews;
