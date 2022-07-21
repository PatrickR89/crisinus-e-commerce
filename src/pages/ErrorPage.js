import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const ErrorPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    function navigateToHome() {
        return navigate(-1);
    }

    setTimeout(() => {
        navigateToHome();
    }, 5000);

    return (
        <Wrapper>
            <h2 className="mb-2">Error: 404</h2>
            <h4 className="mb-2">Page {location.pathname} not found</h4>
            <p className="mb-2">
                Browser will automatically redirect to previous page, in case it
                does not, please click "Back"
            </p>
            <button className="btn" onClick={navigateToHome}>
                Back
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
