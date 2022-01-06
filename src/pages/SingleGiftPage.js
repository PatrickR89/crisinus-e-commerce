import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useItemsContext } from "../contexts/items_context";
import { useCurrencyContext } from "../contexts/currency_context";
import { useLanguageContext } from "../contexts/language_context";

import { Slideshow, PageHero, AddToCart } from "../components";

const SingleGiftPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    fetchSingleGift,
    single_item: gift,
    single_item_loading: loading,
    single_item_error: error
  } = useItemsContext();

  const { priceFormat } = useCurrencyContext();
  const { translation } = useLanguageContext();

  const { description, images, name, price } = gift;

  useEffect(() => {
    fetchSingleGift(id);
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate.push("/books");
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
      <PageHero title={name} adress={translation.giftshop} />
      <Wrapper>
        <div>
          <div className="title">
            <h1>{name}</h1>
          </div>
          <div className="main">
            {images && <Slideshow images={images} />}
            <div className="info">
              <p className="tag">{translation.price} : </p>
              <span className="info-data">{priceFormat(price)}</span>
              <AddToCart product={gift} />
              <div className="secondary">
                <div className="about">
                  <p className="tag">{translation.about} :</p>
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
    text-transform: capitalize;
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
