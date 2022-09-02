import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSidebarContext } from "../../../contexts/sidebar_context";
import crisinus from "../../../defaults/logo-crisinus-nb.png";

import { NavCart, NavButtons } from "../elements";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

const Navbar = () => {
  const { openSidebarNav, isSidebarNavOpen } = useSidebarContext();

  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <div className="to-home"></div>
          </Link>
          <div className="toggle-disp">
            <NavCart />
          </div>
        </div>
        <div className="btn-container">
          <div className="disp-width toggle-disp ">
            <NavButtons nav={true} />
          </div>
          <Link to="/" className="home-mini">
            <img src={crisinus} className="logo-c" alt="home" />
          </Link>
          <IconButton
            aria-label="open nav sidebar"
            edge="end"
            onClick={openSidebarNav}
            sx={{ ...(isSidebarNavOpen && { display: "none" }) }}
            className="toggle-side side-btn"
          >
            <MenuIcon />
          </IconButton>
        </div>
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  .disp-width {
    width: 100%;
  }

  .nav-center {
    width: 100vw;
    margin: 0 auto;
    max-width: var(--max-width);
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
    justify-content: end;
    background: var(--clr-button-3);
  }
  .side-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    background: var(--clr-button-3);
    color: var(--clr-primary-1);
    padding: 1rem !important;
    margin: auto 0.5rem;
    letter-spacing: var(--spacing);
    font-weight: bold;
    transition: var(--transition);
    font-size: 2rem;
    cursor: pointer;
    border-color: transparent;
    border-radius: 0;
    width: 30%;
    height: 100%;
  }
  .side-btn:hover {
    color: var(--clr-primary-2);
    background: var(--clr-button-4);
  }
  .home-mini {
    height: 90%;
    margin: auto 1rem;
  }
  .logo-c {
    height: 100%;
    filter: brightness(70%);
  }

  @media (max-width: 900px) {
    .nav-header {
      height: auto;
    }
    .to-home {
      display: none;
    }
    .btn-container {
      justify-content: space-between;
    }
  }
  @media (min-width: 900px) {
    .home-mini {
      display: none;
    }
    .logo-c {
      display: none;
    }
  }
`;

export default Navbar;
