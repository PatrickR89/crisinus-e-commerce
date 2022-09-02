import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useLanguageContext } from "../../../contexts/language_context";

const NewOrderModal = ({ closeModal }) => {
  const { translation } = useLanguageContext();
  const navigate = useNavigate();

  const handleSubmit = () => {
    closeModal();
    return navigate("/admin/clients/orders", { replace: true });
  };

  return (
    <Wrapper>
      <div className="content glass">
        <div className="header">
          <h2>!</h2>
        </div>
        <div className="body">
          <p>{translation.newOrder}</p>
        </div>
        <div className="footer">
          <button className="btn" onClick={closeModal}>
            {translation.back}
          </button>
          <button className="btn" onClick={handleSubmit}>
            {translation.orders}
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
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--clr-par-9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  .content {
    width: 600px;
    border-radius: 0.3rem;
  }
  .body {
    padding: 15px;
    border-top: 1px solid var(--main-color);
    border-bottom: 1px solid var(--main-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    p {
      margin-top: 1rem;
      margin-bottom: 0.5rem;
      text-align: start;
      color: black;
      text-transform: capitalize;
    }
  }
  .glass {
    background-color: var(--clr-button-3-tp);
    backdrop-filter: blur(2px);
  }
  .header {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    h2 {
      font-size: 5rem;
      color: var(--clr-red-warning);
    }
  }
  .footer {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  }
`;

export default NewOrderModal;
