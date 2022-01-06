import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCurrencyContext } from "../contexts/currency_context";
import { useLanguageContext } from "../contexts/language_context";

const Navbar = () => {
  const { updateCurrency, current_currency, currencies } = useCurrencyContext();
  const { current_language, languages, switchLang, translation } =
    useLanguageContext();

  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <div className="to-home"></div>
          </Link>
          <div className="nav-container">
            <Link to="/cart">
              <FaShoppingCart />
            </Link>
            <form onSubmit={(e) => e.preventDefault()}>
              <select
                name="currency"
                id="currency"
                value={current_currency}
                onChange={updateCurrency}
              >
                {currencies.map((c, index) => {
                  return (
                    <option key={index} value={c}>
                      {c}
                    </option>
                  );
                })}
              </select>
              <select
                name="language"
                id="language"
                value={current_language}
                onChange={switchLang}
              >
                {languages.map((l, index) => {
                  return (
                    <option key={index} value={l}>
                      {l}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>
        </div>
        <div className="btn-container">
          <Link to="/news" className="nav-btn">
            {translation.news}
          </Link>
          <Link to="/books" className="nav-btn">
            {translation.books}
          </Link>
          <Link to="/giftshop" className="nav-btn">
            {translation.giftshop}
          </Link>
          <Link to="/about" className="nav-btn">
            {translation.aboutUs}
          </Link>
          <Link to="/contact" className="nav-btn">
            {translation.contact}
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
    width: 100vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-container {
    display: flex;
    margin-right: 15em;
    a {
      font-size: 2rem;
      margin: 2rem;
      color: var(--clr-button-2);
      transition: 0.3s ease-out;
    }
    a:hover {
      cursor: ponter;
      color: var(--clr-button-4);
    }
    form {
      display: flex;
      flex-direction: column;
    }
    select {
      background: transparent;
      border: none;
      color: var(--clr-button-3);
      font-size: 1.2rem;
      margin: 0.75rem 0;
    }
    select:focus {
      outline: none;
      background: none;
    }
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
