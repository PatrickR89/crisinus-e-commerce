import React from "react";
import styled from "styled-components";
import logo from "../../defaults/logo-crisinus-nb.png";
import { useLanguageContext } from "../../contexts/language_context";

const WhenLoading = () => {
  const { translation } = useLanguageContext();
  return (
    <Wrapper>
      <div className="body">
        <div className="margin">
          <h2 className="written"> {translation.pleaseWaitLoad}</h2>
        </div>
        <div className="main">
          <div className="shine">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="margin"></div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .margin {
    height: 10vh;
    width: 100%;
    background-color: var(--clr-button-6);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .main {
    height: 25vh;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .written {
    overflow: hidden;
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: 0.15em;
    animation: typing 1s steps(20) infinite;
  }

  .shine {
    position: absolute;
    height: 25vh;
    overflow: hidden;
    top: 0px;
    img {
      height: 100%;
    }
  }

  .shine::before {
    content: "";
    position: absolute;
    width: 90px;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    transform: skewX(-30deg);
    animation-name: slide;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-direction: normal;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0.4) 65%,
      rgba(255, 255, 255, 0.7) 80%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes slide {
    0% {
      left: -200px;
      top: 0;
    }
    50% {
      left: 120px;
      top: 0px;
    }
    100% {
      left: 290px;
      top: 0;
    }
  }
`;

export default WhenLoading;
