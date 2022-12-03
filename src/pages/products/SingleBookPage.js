import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slideshow from "../../components/public/elements/slideshow/Slideshow";
import {
  PageHero,
  DimensionsContainer
} from "../../components/public/elements";
import { AddToCart } from "../../components/public/cart";
import { useItemsContext } from "../../contexts/items_context";
import { useCurrencyContext } from "../../contexts/currency_context";
import { useLanguageContext } from "../../contexts/language_context";
import { useAuthorsContext } from "../../contexts/authors_context";

const SingleBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { translation } = useLanguageContext();

  const {
    fetchSingleBook,
    item_dimensions,
    single_book: book,
    single_item_loading: loading,
    single_item_error: error
  } = useItemsContext();
  const { priceFormat } = useCurrencyContext();
  const { changeAuthor } = useAuthorsContext();

  function redirectToAuthors(author_url) {
    changeAuthor(author_url);
    navigate(`/authors/${author_url}`, { replace: true });
  }

  useEffect(() => {
    fetchSingleBook(id);
    // eslint-disable-next-line
  }, [id]);

  const {
    title,
    authors,
    images,
    price,
    publisher,
    language,
    year,
    description,
    genre
  } = book;

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/books", { replace: true });
      }, 1500);
    }
    // eslint-disable-next-line
  }, [error]);

  if (error) {
    return (
      <div className="loading">
        <h1>Unfortunately an error occured</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <h1>{translation.pleaseWait}...</h1>
      </div>
    );
  }

  return (
    <main>
      <PageHero title={title} adress={translation.books} link={"books"} />
      <Wrapper>
        <div className="main-book">
          <div className="title">
            <h1>{title}</h1>
          </div>
          <div className="grid-display">
            <div className="grid-cell">
              {images?.length !== undefined && images.length > 0 && (
                <Slideshow images={images} />
              )}
            </div>
            <div className="info grid-cell">
              {authors.length > 1 ? (
                <p className="tag">{translation.authors}:</p>
              ) : (
                <p className="tag">{translation.author}:</p>
              )}

              {authors?.length !== undefined &&
                authors.map((author, index) => {
                  return (
                    <button
                      key={index}
                      className="author-btn"
                      onClick={() => redirectToAuthors(author.id)}
                    >
                      <p key={author.last_name}>
                        <span className="info-data">{author.last_name}</span>{" "}
                        {author.name}
                      </p>
                    </button>
                  );
                })}
              <DimensionsContainer dimensions={item_dimensions} />
            </div>
            <div className="info grid-cell">
              <div className="data-container">
                <p className="tag">{translation.price} : </p>
                <span className="info-data">{priceFormat(price)}</span>
              </div>
              <div className="data-container">
                <p className="tag">{translation.publisher} : </p>
                <span className="info-data">{publisher}</span>
              </div>
              <div className="data-container">
                <p className="tag">{translation.language} : </p>
                <span className="info-data">{language}</span>
              </div>
              <div className="data-container">
                <p className="tag">{translation.genre} : </p>
                <span className="info-data">{genre}</span>
              </div>
              <div className="data-container">
                <p className="tag">{translation.year} : </p>
                <span className="info-data">{year}</span>
              </div>
            </div>
            <div className="grid-cell">
              <AddToCart product={book} />
            </div>
          </div>
        </div>
        <div className="secondary">
          <div className="about">
            <p className="tag">{translation.about} :</p>
            <article className="line-break">{description}</article>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  .main-book {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .author-btn {
    background: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
  }
  .tag {
    color: var(--clr-primary-3);
    text-transform: capitalize;
  }
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    margin: 0rem 1rem auto auto;
    span {
    }
  }
  .data-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
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
        font-size: 1.5rem;
        font-weight: bold;
        text-transform: capitalize;
      }
      article {
        font-size: 1.2rem;
      }
    }
  }

  .grid-display {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 0.5rem;
  }

  .grid-cell {
    margin: auto;
  }
  @media (max-width: 850px) {
    .main-book {
      flex-direction: column;
      margin: 2rem auto;
    }

    .grid-display {
      grid-template-columns: 1fr;
    }
    .grid-cell {
      width: 100%;
      margin: 1rem auto;
    }

    .secondary {
      .about {
        .tag {
          font-size: 1.2rem;
        }
        article {
          font-size: 1rem;
          margin: 1.25rem auto;
        }
      }
    }
  }
`;

export default SingleBookPage;
