import React from "react";
import styled from "styled-components";

import { useLanguageContext } from "../../../contexts/language_context";

const SingleMessageModal = ({
  message,
  handleClose,
  handleConfirm,
  handleDelete
}) => {
  const { translation } = useLanguageContext();

  const msg = JSON.stringify(message.message);

  return (
    <Wrapper>
      <div className="content glass">
        <div className="header">
          <h2>
            {translation.name}: {message.name}
          </h2>
          <h2>
            Email: <span>{message.email}</span>
          </h2>
        </div>
        <div className="body">
          <p className="par">{msg}</p>
        </div>
        <div className="footer">
          <p className="par">{message.date}</p>
          <div>
            <button className="btn" onClick={handleClose}>
              {translation.back}
            </button>
            {message.status !== "CONFIRMED" && (
              <button
                className="btn approve"
                onClick={() => {
                  handleConfirm("CONFIRMED", message.id);
                  handleClose();
                }}
              >
                {translation.confirm}
              </button>
            )}

            <button
              className="btn-delete btn"
              onClick={() => {
                handleDelete(message.id);
                handleClose();
              }}
            >
              {translation.delete}
            </button>
          </div>
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
    width: 70%;
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
    flex-direction: column;
    h2 {
      font-size: 1.5rem;
      color: var(--clr-black);
      margin: 0.5rem;
      span {
        text-transform: lowercase;
      }
    }
  }
  .par {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    text-align: start;
    color: var(--clr-white);
    text-transform: capitalize;
  }
  .footer {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  }

  .btn {
    margin: 0.5rem;
  }
  .approve {
    background-color: var(--clr-green-dark);
  }
`;

export default SingleMessageModal;
