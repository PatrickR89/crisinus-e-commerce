import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Slideshow, PageHero, AddToCart } from "../components";
import { useItemsContext } from "../contexts/items_context";
import { useCurrencyContext } from "../contexts/currency_context";
import { useLanguageContext } from "../contexts/language_context";

const SingleBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { translation } = useLanguageContext();

  const {
    fetchSingleBook,
    single_item: book,
    single_item_loading: loading,
    single_item_error: error
  } = useItemsContext();
  const { priceFormat } = useCurrencyContext();

  const {
    title,
    authors,
    images,
    price,
    publisher,
    language,
    year,
    desc,
    genre
  } = book;

  useEffect(() => {
    fetchSingleBook(id);
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate.push("/books");
      }, 1500);
    }
  }, [error, !book]);

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
      <PageHero title={title} adress={translation.books} />
      <Wrapper>
        <div className="main">
          <div className="title">
            <h1>{title}</h1>
          </div>
          <div className="info">
            {authors.length > 1 ? (
              <p className="tag">{translation.authors}:</p>
            ) : (
              <p className="tag">{translation.author}:</p>
            )}
            {authors.map((author) => {
              return (
                <p key={author.last_name}>
                  <span className="info-data">{author.last_name}</span>{" "}
                  {author.name}
                </p>
              );
            })}
          </div>
          {images && <Slideshow images={images} />}
          <div className="layout">
            <div className="info">
              <div>
                <p className="tag">{translation.price} : </p>
                <span className="info-data">{priceFormat(price)}</span>
              </div>
              <div>
                <p className="tag">{translation.publisher} : </p>
                <span className="info-data">{publisher}</span>
              </div>
              <div>
                <p className="tag">{translation.language} : </p>
                <span className="info-data">{language}</span>
              </div>
              <div>
                <p className="tag">{translation.genre} : </p>
                <span className="info-data">{genre}</span>
              </div>
              <div>
                <p className="tag">{translation.year} : </p>
                <span className="info-data">{year}</span>
              </div>
            </div>
            <AddToCart product={book} />
          </div>
        </div>
        <div className="secondary">
          <div className="about">
            <p className="tag">{translation.about} :</p>
            <article>{desc}</article>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: block;
  .main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: center;
    margin: auto;
  }
  .tag {
    color: var(--clr-primary-3);
    text-transform: capitalize;
  }
  .info {
    font-size: 1.5rem;
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      span {
        margin-left: 0.5rem;
      }
    }
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
        text-transform: capitalize;
      }
      article {
        font-size: 1.5rem;
      }
    }
  }
  .layout {
    display: flex;
    flex-direction: row;
  }
`;

export default SingleBookPage;
