import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <div className="to-home"></div>
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

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    height: 7rem;
    background: var(--nav-background);
    background-repeat: no-repeat;
    background-size: auto 100%;
    .to-home {
      height: 6rem;
      width: 7.5rem;
      transition: 0.2s ease-out;
      background-color: var(--clr-white-transparent);
    }
    .to-home:hover {
      background-color: var(--clr-white-semi-transparent);
    }
    a {
      margin-left: 2rem;
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
  }
`;

export default Navbar;
