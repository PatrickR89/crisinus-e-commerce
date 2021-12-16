import React from "react";
import { News } from "../components";
import styled from "styled-components";

const NewsPage = () => {
  return (
    <Wrapper>
      <News />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  height: calc(100vh - 8rem);
`;

export default NewsPage;
