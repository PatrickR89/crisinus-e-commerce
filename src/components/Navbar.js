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
        </div>
        <div className="btn-container">
          <Link to="/news" className="nav-btn">
            news
          </Link>
          <Link to="/books" className="nav-btn">
            books
          </Link>
          <Link to="/giftshop" className="nav-btn">
            giftshop
          </Link>
          <Link to="/about" className="nav-btn">
            about us
          </Link>
          <Link to="/contact" className="nav-btn">
            contact
          </Link>
        </div>
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;

    img {
      width: 85px;
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
    }
  }
  .btn-container {
    display: flex;
    height: 10vh;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    background: var(--clr-button-3);
    color: var(--clr-primary-1);
    padding: auto;
    letter-spacing: var(--spacing);
    font-weight: bold;
    transition: var(--transition);
    font-size: 1rem;
    cursor: pointer;
    border-color: transparent;
    width: 20%;
    height: 100%;
  }
  .nav-btn:hover {
    color: var(--clr-primary-2);
    background: var(--clr-button-4);
    transform: scale(1.15);
  }
`;

export default Navbar;
