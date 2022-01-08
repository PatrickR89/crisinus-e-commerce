import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageHero, ContactForm } from "../components";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { useLanguageContext } from "../contexts/language_context";

const ContactPage = () => {
  const { translation } = useLanguageContext();

  return (
    <main>
      <PageHero title={translation.contact} />
      <Wrapper>
        <div className="contact">
          <ContactForm />
        </div>
        <div className="info">
          <Link to="#" className="logo">
            <FaFacebook />
          </Link>
          <Link to="#" className="logo">
            <FaInstagram />
          </Link>
          <Link to="#" className="logo">
            <FaYoutube />
          </Link>
          <Link to="#" className="logo">
            <FiMail />
          </Link>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  .info {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: start;
    background: var(--clr-primary-8);
  }
  .contact {
    width: 100%;
  }
  .logo {
    margin: auto;
    font-size: 30px;
    svg {
      color: var(--clr-button-2);
      transition: 0.3s ease-in;
    }
    svg:hover {
      color: var(--clr-primary-2);
    }
  }

  @media (max-width: 750px) {
    flex-direction: column;
    .info {
      flex-direction: row;
      width: 100%;
      padding: 2rem 1rem;
    }
  }
`;

export default ContactPage;
