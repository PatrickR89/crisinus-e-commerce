import React from "react";
import styled from "styled-components";
import { useLanguageContext } from "../contexts/language_context";

const ContactForm = () => {
  const { translation } = useLanguageContext();

  return (
    <Wrapper>
      <form className="contact-form">
        <label className="title" htmlFor="user">
          {translation.name}:
        </label>
        <input type="text" id="user" name="user" />
        <label className="title" htmlFor="email">
          Email:
        </label>
        <input type="email" id="email" name="email" />
        <label className="title" htmlFor="message">
          {translation.yourMsg}:
        </label>
        <textarea
          className="msg"
          name="message"
          id="message"
          cols="100"
          rows="10"
        ></textarea>
        <button type="submit" className="btn">
          {translation.send}
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .contact-form {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    background: var(--clr-button-5);
    padding: 1rem;
    input {
      width: 100%;
      outline: none;
      border: none;
      font-size: 1.5rem;
      padding: 0.5rem;
      margin-bottom: 1rem;
    }
    .title {
      color: var(--clr-primary-2);
      font-weight: bold;
      text-transform: capitalize;
    }
    .msg {
      border: none;
      resize: none;
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    .msg:focus {
      outline: none;
    }
  }
`;

export default ContactForm;
