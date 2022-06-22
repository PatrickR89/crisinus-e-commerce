import React, { useState } from "react";
import SlideshowButtons from "./SlideshowButtons";
import styled from "styled-components";

const Slideshow = ({ images }) => {
    const [n, setN] = useState(0);
    let tempN;

    const previousSlide = () => {
        tempN = n - 1;
        if (tempN < 0) {
            tempN = images.length - 1;
        }
        setN(tempN);
    };
    const nextSlide = () => {
        tempN = n + 1;
        if (tempN > images.length - 1) {
            tempN = 0;
        }
        setN(tempN);
    };

    return (
        <Wrapper>
            <div className="container">
                {images.map((image, index) => {
                    return (
                        <div
                            key={index}
                            className={index === n ? "fade" : "slide fade"}
                        >
                            <img src={`/${image}`} alt="" />
                        </div>
                    );
                })}
                {images.length > 1 && (
                    <SlideshowButtons
                        previousSlide={previousSlide}
                        nextSlide={nextSlide}
                    />
                )}
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    box-sizing: border-box;
    position: relative;
    .container {
        max-width: 350px;
        height: 450px;
        display: flex;
        align-items: center;
        position: relative;
        margin: 1rem;
        img {
            max-width: 350px;
            margin: auto;
        }
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
        border: none;

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
    @media (max-width: 1200px) {
        .container {
            width: 300px;
            height: 400px;

            img {
                max-width: 300px;
            }
        }
    }
    @media (max-width: 850px) {
        .container {
            margin: auto;
        }
    }
    @media (max-width: 600px) {
        .container {
            width: 250px;
            height: 300px;
            img {
                max-width: 250px;
            }
        }
    }
`;

export default Slideshow;
