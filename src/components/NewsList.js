import React from "react";
import styled from "styled-components";

const NewsList = ({ title, date }) => {
  return (
    <Wrapper>
      {title}
      <p>{date}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 0.8rem;
    color: var(--clr-primary-1);
  }
`;

export default NewsList;
