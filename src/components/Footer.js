import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrap>
      <h5>&copy; {new Date().getFullYear()}</h5>
    </FooterWrap>
  );
};

const FooterWrap = styled.footer`
  height: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--clr-black);
  text-align: center;
  color: var(--clr-par-7);
`;

export default Footer;
