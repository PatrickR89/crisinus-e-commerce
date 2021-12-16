import React from "react";
import styled from "styled-components";
import logo from "../defaults/logo-chrisinus.jpeg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="chrisinus logo" />
          </Link>

          <div>
            <Link to="/news" className="btn">
              news
            </Link>
            <Link to="/books" className="btn">
              books
            </Link>
            <Link to="/giftshop" className="btn">
              giftshop
            </Link>
            <Link to="/about" className="btn">
              about us
            </Link>
            <Link to="/contact" className="btn">
              contact
            </Link>
          </div>
        </div>
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      margin-bottom: -5px;
      margin-left: -15px;
      transition: 0.2s ease-out;
    }
    img:hover {
      opacity: 0.8;
    }
    div {
      width: 100%;
      display: inherit;
      align-items: inherit;
      justify-content: space-between;
      margin-left: 2rem;
      margin-top: 2rem;
      .btn {
        padding: 0.375rem 2.5rem;
      }
    }
  }
`;

export default Navbar;
