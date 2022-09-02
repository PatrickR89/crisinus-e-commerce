import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../../defaults/logo-crisinus-nb.png";
import { useLanguageContext } from "../../contexts/language_context";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const WhenError = ({ handleError }) => {
  const { translation } = useLanguageContext();
  const navigate = useNavigate();

  let errorTimeout = setTimeout(() => {
    return navigate(-1);
  }, 3000);

  const handleClick = () => {
    clearTimeout(errorTimeout);
    handleError();
    return navigate(-1);
  };

  return (
    <Wrapper>
      <div className="body">
        <div className="margin">
          <ErrorOutlineIcon className="icon" />
          <p> {translation.errorMsg}</p>
        </div>
        <div className="main">
          <div className="shine">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="margin">
          <p>{translation.pageErrMsg}</p>
          <button className="btn" onClick={handleClick}>
            {translation.back}
          </button>
        </div>
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
    display: flex;
    flex-direction: column;
    height: 12vh;
    width: 100%;
    background-color: var(--clr-button-6);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
    p {
      margin: 1rem;
    }
  }

  .main {
    height: 25vh;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    font-size: 4rem;
    color: var(--clr-red-warning);
    animation-name: blink;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
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

  @keyframes blink {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0.5;
    }
    50% {
      opacity: 0;
    }
    75% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default WhenError;
