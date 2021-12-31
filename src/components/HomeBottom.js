import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeBottom = () => {
  return (
    <Wrapper>
      <div className="btn-container">
        <Link to="/authors" className="bottom-btn">
          Authors
        </Link>
        <Link to="#" className="bottom-btn">
          Reviews
        </Link>
      </div>
      <div>
        <form className="newsletter">
          <label htmlFor="email">
            {" "}
            <h2> Subscribe to our newsletter </h2>
          </label>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
            <button type="submit" className="btn">
              Subscribe
            </button>
          </div>
        </form>
      </div>
      <div className="btn-container bottom-container">
        <Link to="/order" className="bottom-btn">
          How to order
        </Link>
        <div className="btn-stack">
          <Link to="/info" className="bottom-btn">
            General information
          </Link>
          <Link to="/payment" className="bottom-btn">
            Payment and shipping
          </Link>
        </div>
        <Link to="/disclaimer" className="bottom-btn">
          Disclaimer
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .newsletter {
    display: flex;
    flex-direction: column;
    background: var(--clr-button-6);
    padding-bottom: 1rem;
    h2 {
      margin: 1rem;
    }
    div {
      display: flex;
      flex-direction: row;
      height: 5vh;
      input {
        width: 80%;
        font-size: 1.5rem;
        border: none;
        margin: 0rem 1rem;
        padding: 0.7rem 0.7rem;
        border-radius: 5%;
        background: var(--clr-primary-8);
        color: var(--clr-par-6);
      }
      input:focus {
        outline: none;
      }
      .btn {
        width: 20%;
        font-weight: bold;
        font-size: 1rem;
      }
    }
  }
  .btn-container {
    display: flex;
    height: 10vh;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  .bottom-btn {
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
    border-radius: none;
    width: 100%;
    height: 100%;
  }
  .bottom-btn:hover {
    color: var(--clr-primary-2);
    background: var(--clr-button-4);
  }
  .btn-stack {
    width: 100%;
    height: 100%;
    .bottom-btn {
      height: 50%;
    }
  }
  .bottom-container {
    margin-bottom: 0.1rem;
  }
`;

export default HomeBottom;
