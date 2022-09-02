import React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useLanguageContext } from "../../../contexts/language_context";
import { useItemsContext } from "../../../contexts/items_context";

const ContactForm = () => {
  const { translation } = useLanguageContext();
  const { updateContactForm, contactForm, submitContactForm } =
    useItemsContext();

  return (
    <Wrapper>
      <div className="contact-form">
        <label className="title" htmlFor="contactName">
          {translation.name}:
        </label>
        <TextField
          className="contact-input"
          type="text"
          id="contactName"
          name="contactName"
          onChange={updateContactForm}
          variant="standard"
          value={contactForm.values.contactName}
          error={contactForm.errors.contactNameError}
          helperText={
            contactForm.errors.contactNameError && translation.clientNameMsg
          }
        />
        <label className="title" htmlFor="contactEmail">
          Email:
        </label>
        <TextField
          className="contact-input"
          type="email"
          id="contactEmail"
          name="contactEmail"
          onChange={updateContactForm}
          variant="standard"
          value={contactForm.values.contactEmail}
          error={contactForm.errors.contactEmailError}
          helperText={
            contactForm.errors.contactEmailError && translation.clientEmailMsg
          }
        />
        <label className="title" htmlFor="contactMessage">
          {translation.yourMsg}:
        </label>
        <textarea
          className="msg"
          name="contactMessage"
          id="contactMessage"
          cols="100"
          rows="10"
          onChange={updateContactForm}
        ></textarea>
        <button
          type="submit"
          className="btn"
          disabled={contactForm.contactFormError}
          onClick={submitContactForm}
        >
          {translation.send}
        </button>
      </div>
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
    .contact-input {
      width: 100%;
      outline: none;
      border: none;
      font-size: 1.5rem;
      padding: 0.5rem;
      margin-bottom: 1rem;
      background-color: white;
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
