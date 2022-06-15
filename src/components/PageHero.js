import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLanguageContext } from "../contexts/language_context";
import { english } from "../languages/languages";

const PageHero = ({ title, adress, link }) => {
    const { translation } = useLanguageContext();

    const keepEnglish = (word) => {
        console.log(english);
    };
    console.log(keepEnglish(adress));
    return (
        <Wrapper>
            <div className="section">
                <h3>
                    <Link to="/">{translation.home}</Link>
                    {adress && <Link to={`/${link}`}>/{adress}</Link>}/ {title}
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
