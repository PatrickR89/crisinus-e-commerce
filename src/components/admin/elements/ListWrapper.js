import React from "react";
import styled from "styled-components";

const ListWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export default ListWrapper;
