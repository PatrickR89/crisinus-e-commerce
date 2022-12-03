import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLanguageContext } from "../../../contexts/language_context";

const PageHero = ({ title, adress, link }) => {
  const { translation } = useLanguageContext();

  return (
    <Wrapper>
      <div className="section">
        <h3>
          <Link className="page-direct" to="/">
            {translation.home}/
          </Link>
          {adress && (
            <Link className="page-direct" to={`/${link}`}>
              {adress}/
            </Link>
          )}
          {title}
        </h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-button-3);
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);
  font-size: 1rem;
  margin-bottom: 2rem;

  .section {
    padding: 2rem;
  }

  .page-direct {
    display: inline-block;
  }

  .page-direct::first-letter {
    text-transform: capitalize;
  }
  a {
    color: var(--clr-primary-3);
    padding: 0rem 0.2rem 0rem 0rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`;

export default PageHero;
