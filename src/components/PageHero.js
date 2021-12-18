import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const PageHero = ({ title, adress }) => {
  return (
    <Wrapper>
      <div className="section">
        <h3>
          <Link to="/">Home</Link>
          {adress && <Link to={`/${adress}`}>/{adress}</Link>}/ {title}
        </h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-button-3);
  width: 100%;
  height: 5vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);
  font-size: 1rem;
  text-transform: capitalize;
  margin-bottom: 2rem;

  .section {
    padding: 2rem;
  }
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`;

export default PageHero;
