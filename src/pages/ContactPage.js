import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageHero, ContactForm } from "../components";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const ContactPage = () => {
  return (
    <main>
      <PageHero title="Contact" />
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
            <FaTwitter />
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
`;

export default ContactPage;
