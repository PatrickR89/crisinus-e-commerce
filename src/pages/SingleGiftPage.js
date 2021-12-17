import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import mockGifts from "../mockData/mockGifts";
import { Slideshow } from "../components";

const SingleGiftPage = () => {
  const { id } = useParams();
  const [gift, setGift] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(mockGifts);
    const tempGift = mockGifts.find((gift) => gift.id === parseInt(id));
    console.log(tempGift);
    setGift(tempGift);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <h1>LOADING...</h1>
      </div>
    );
  }

  const { name, price, stock, images, description } = gift;

  return (
    <Wrapper>
      <div className="main">
        <div className="title">
          <h1>{name}</h1>
        </div>
        <div className="info"></div>
        {images && <Slideshow images={images} />}
        <div className="info">
          <p className="tag">Price : </p>
          <span className="info-data">{price / 100}kn</span>

          <p className="tag">In our stock : </p>
          <span className="info-data">{stock} pcs</span>

          <div className="secondary">
            <div className="about">
              <p className="tag">About :</p>
              <article>{description}</article>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: block;
  .main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: center;
    margin: 2rem;
  }
  .tag {
    color: var(--clr-primary-3);
    margin: 1rem;
  }
  .info {
    font-size: 1.5rem;
  }
  .info-data {
    font-weight: bold;
    text-transform: capitalize;
  }
  .secondary {
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    .about {
      display: grid;
      grid-column: 1;
      p {
        text-align: start;
        margin-left: 1rem;
        font-size: 2rem;
        font-weight: bold;
      }
      article {
        font-size: 1.5rem;
        text-align: start;
      }
    }
  }
`;

export default SingleGiftPage;
