import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useLanguageContext } from "../../../contexts/language_context";

const CookiesModal = ({ close }) => {
  const { translation } = useLanguageContext();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="content glass">
        <div className="header">
          <h2>Cookies</h2>
        </div>
        <div className="body">
          <p>
            This page uses basic cookies to improve your browsing expirience.
          </p>
        </div>
        <div className="footer">
          <button className="btn" onClick={close}>
            CONTINUE
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--clr-par-9);
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 100%;
    border-radius: 0.3rem;
  }
  .body {
    padding: 0rem 0rem 0rem 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    p {
      margin-bottom: 0.5rem;
      text-align: start;
      color: var(--clr-white);
      text-transform: capitalize;
    }
  }
  .glass {
    background-color: var(--clr-white-transparent);
    backdrop-filter: blur(2px);
  }
  .header {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    h2 {
      color: var(--clr-button-3);
    }
  }
  .footer {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
  }
`;

export default CookiesModal;
