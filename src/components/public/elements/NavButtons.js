import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLanguageContext } from "../../../contexts/language_context";
import { useSidebarContext } from "../../../contexts/sidebar_context";

const NavButtons = ({ nav }) => {
    const { translation } = useLanguageContext();
    const { closeSidebarNav } = useSidebarContext();
    return (
        <Wrapper>
            <div className={nav ? "nav-container" : "side-container"}>
                <Link
                    to="/news"
                    className={nav ? "nav-btn" : "nav-btn side-btn"}
                    onClick={closeSidebarNav}
                >
                    {translation.news}
                </Link>
                <Link
                    to="/books"
                    className={nav ? "nav-btn" : "nav-btn side-btn"}
                    onClick={closeSidebarNav}
                >
                    {translation.books}
                </Link>
                <Link
                    to="/giftshop"
                    className={nav ? "nav-btn" : "nav-btn side-btn"}
                    onClick={closeSidebarNav}
                >
                    {translation.giftshop}
                </Link>
                <Link
                    to="/about"
                    className={nav ? "nav-btn" : "nav-btn side-btn"}
                    onClick={closeSidebarNav}
                >
                    {translation.aboutUs}
                </Link>
                <Link
                    to="/contact"
                    className={nav ? "nav-btn" : "nav-btn side-btn"}
                    onClick={closeSidebarNav}
                >
                    {translation.contact}
                </Link>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    .nav-container {
        display: flex;
        height: 10vh;
        width: 100%;
        align-items: center;
        justify-content: space-between;
    }
    .side-container {
        width: 100%;
    }
    .nav-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        background: var(--clr-button-3);
        color: var(--clr-primary-1);
        padding: auto;
        letter-spacing: var(--spacing);
        font-weight: bold;
        transition: var(--transition);
        font-size: 1rem;
        cursor: pointer;
        border-color: transparent;
        width: 20%;
        height: 100%;
    }
    .side-btn {
        width: 100%;
        height: 3rem;
    }
    .nav-btn:hover {
        color: var(--clr-primary-2);
        background: var(--clr-button-4);
    }
`;

export default NavButtons;
