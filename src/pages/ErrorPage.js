import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useLanguageContext } from "../contexts/language_context";

const ErrorPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { translation } = useLanguageContext();

    function navigateToHome() {
        return navigate(-1);
    }

    setTimeout(() => {
        navigateToHome();
    }, 5000);

    return (
        <Wrapper>
            <h2 className="mb-2">{translation.error}: 404</h2>
            <h4 className="mb-2">{`${translation.page} ${location.pathname} ${translation.notFound}`}</h4>
            <p className="mb-2">{translation.pageErrMsg}</p>
            <button className="btn" onClick={navigateToHome}>
                {translation.back}
            </button>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 4rem;
    .mb-2 {
        margin-bottom: 2rem;
    }
`;

export default ErrorPage;
