import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import mockGifts from "../mockData/mockGifts";
import { Slideshow, PageHero, AddToCart } from "../components";

const SingleGiftPage = () => {
  const { id } = useParams();
  const [gift, setGift] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tempGift = mockGifts.find((gift) => gift.id === parseInt(id));
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

  const { name, price, images, description } = gift;

  return (
    <main>
      <PageHero title={name} adress="Giftshop" />
      <Wrapper>
        <div>
          <div className="title">
            <h1>{name}</h1>
          </div>
          <div className="main">
            {images && <Slideshow images={images} />}
            <div className="info">
              <p className="tag">Price : </p>
              <span className="info-data">{price / 100}kn</span>
              <AddToCart product={gift} />
              <div className="secondary">
                <div className="about">
                  <p className="tag">About :</p>
                  <article>{description}</article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  .main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: center;
    margin: 2rem;
  }
  .title {
    width: 100%;
    text-align: start;
    margin: auto 8rem;
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
