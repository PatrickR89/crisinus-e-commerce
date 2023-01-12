import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useItemsContext } from "../../contexts/items_context";
import { useLanguageContext } from "../../contexts/language_context";
import formatPrice from "../../utils/formatPrice";

import Slideshow from "../../components/public/elements/slideshow/Slideshow";
import {
  PageHero,
  DimensionsContainer
} from "../../components/public/elements";
import { AddToCart } from "../../components/public/cart";

const SingleGiftPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    fetchSingleGift,
    item_dimensions,
    single_gift: gift,
    single_item_loading: loading,
    single_item_error: error
  } = useItemsContext();

  const { translation } = useLanguageContext();

  const { description, images, name, price } = gift;

  useEffect(() => {
    fetchSingleGift(id);
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/giftshop", { replace: true });
      }, 1500);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="loading">
        <h1>{translation.pleaseWait}...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading">
        <h1>Unfortunately an error occured</h1>
      </div>
    );
  }

  return (
    <main>
      <Hero>
        <PageHero
          title={name}
          adress={translation.giftshop}
          link={"giftshop"}
        />
      </Hero>
      <Wrapper>
        <div className=" grid-cell grid-cell-span-2">
          <div className="title">
            <h2>{name}</h2>
          </div>
        </div>
        <div className="grid-cell">
          {images?.length !== undefined && images.length > 0 && (
            <Slideshow images={images} />
          )}
        </div>
        <div className="grid-cell">
          <DimensionsContainer dimensions={item_dimensions} />
        </div>
        <div className="grid-cell grid-cell-right">
          <div className="info">
            <p className="tag">{translation.price} : </p>
            <span className="info-data">{formatPrice(price)}</span>
            <AddToCart product={gift} />
          </div>
        </div>
        <div className="grid-cell grid-cell-span-2">
          <div className="about">
            <p className="tag">{translation.about} :</p>
            <article className="line-break">{description}</article>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};
const Hero = styled.div`
  margin-bottom: 2rem;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: auto 0.1rem !important;
  .grid-cell {
    margin: 1rem auto;
  }
  .grid-cell-span-2 {
    grid-column: span 2;
  }
  .grid-cell-right {
    grid-column-start: 2;
  }argin: 2rem auto;
  }
  .title {
    text-align: center;
    h2 {
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
  }

  .about {
    display: grid;
    grid-column: 1;

    article {
      font-size: 1rem;
      text-align: start;
    }
  }

  .tag {
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    color: var(--clr-primary-3);
  }
  .info-data {
    margin-bottom: 1rem;
  }

  .info {
    font-size: 1rem;
    align-items: center;
    span {
      font-weight: bold;
      text-transform: capitalize;
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 800px) {
    grid-template-columns: 100%;
    grid-gap: auto;
    .title {
      text-align: center;
    }

    .grid-cell {
      margin: 1rem 1rem;;
    }

    .grid-cell-right {
      grid-column-start: 1;
    }

    .grid-cell-span-2 {
      grid-column: span 1;
    }
  }
`;

export default SingleGiftPage;
