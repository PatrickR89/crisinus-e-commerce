import React from "react";
import styled from "styled-components";

const SingleNews = ({ title, text, date }) => {
  return (
    <Wrapper>
      <h2>{title}</h2>
      <p>{text.substring(0, 500)}</p>
      <p style={{ color: "grey" }}>{date}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  p {
    color: var(--clr-par-6);
  }
`;

export default SingleNews;
