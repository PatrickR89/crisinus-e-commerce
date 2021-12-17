import React, { useState } from "react";
import styled from "styled-components";

const Slideshow = ({ images }) => {
  const [n, setN] = useState(0);
  let tempN;

  const previousSlide = () => {
    tempN = n - 1;
    if (tempN < 0) {
      tempN = images.length - 1;
    }
    console.log(tempN);
    setN(tempN);
  };
  const nextSlide = () => {
    tempN = n + 1;
    if (tempN > images.length - 1) {
      tempN = 0;
    }
    console.log(tempN);
    setN(tempN);
  };

  return (
    <Wrapper>
      <div className="container">
        {images.map((image, index) => {
          return (
            <div className={index === n ? "fade" : "slide fade"}>
              <img src={image} style={{ height: "500px" }} />
            </div>
          );
        })}
        <a className="prev" onClick={() => previousSlide()}>
          &#10094;
        </a>
        <a className="next" onClick={() => nextSlide()}>
          &#10095;
        </a>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  .container {
    max-width: 500px;
    position: relative;
    margin: auto;
  }
  .slide {
    display: none;
  }
  .prev,
  .next {
    position: absolute;
    top: 50%;
    width: auto;
    margin-top: -22px;
    padding: 10px 20px;
    color: white;
    font-size: 20px;
    transition: 0.3s ease-in-out;
    background-color: rgba(0, 0, 0, 0.05);

    user-select: none;
  }

  .prev {
    left: 0;
    border-radius: 0 3px 3px 0;
  }

  .next {
    right: 0;
    border-radius: 3px 0 0 3px;
  }

  .prev:hover,
  .next:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .fade {
    -webkit-animation-name: fade;
    -webkit-animation-duration: 1.5s;
    animation-name: fade;
    animation-duration: 1.5s;
  }

  @-webkit-keyframes fade {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }
`;

export default Slideshow;
