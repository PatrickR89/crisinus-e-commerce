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
`;

export default NewsList;
