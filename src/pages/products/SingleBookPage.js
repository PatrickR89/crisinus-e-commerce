import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slideshow from "../../components/public/elements/slideshow/Slideshow";
import {
  PageHero,
  DimensionsContainer,
  BookProperties
} from "../../components/public/elements";
import { AddToCart } from "../../components/public/cart";
import { useItemsContext } from "../../contexts/items_context";
import { useLanguageContext } from "../../contexts/language_context";
import { useAuthorsContext } from "../../contexts/authors_context";
import { PropertiesContainer } from "../../components/public/elements/PropertiesContainer";
import formatPrice from "../../utils/formatPrice";

const SingleBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { translation } = useLanguageContext();

  const {
    fetchSingleBook,
    item_dimensions,
    book_properties,
    single_book: book,
    single_item_loading: loading,
    single_item_error: error
  } = useItemsContext();
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
              <PropertiesContainer>
                {authors.length > 1 ? (
                  <h4 className="tag dim-title">{translation.authors}:</h4>
                ) : (
                  <h4 className="tag dim-title">{translation.author}:</h4>
                )}

                {authors?.length !== undefined &&
                  authors.map((author, index) => {
                    return (
                      <button
                        key={index}
                        className="author-btn single-container"
                        onClick={() => redirectToAuthors(author.id)}
                      >
                        <p style={{ marginRight: "0.5rem" }}>{author.name}</p>
                        <span style={{ marginRight: "auto" }}>
                          {author.last_name}
                        </span>{" "}
                      </button>
                    );
                  })}
              </PropertiesContainer>
              <DimensionsContainer dimensions={item_dimensions} />
              <BookProperties properties={book_properties} />
            </div>
            <PropertiesContainer className="book-details">
              <div className="single-container">
                <span>{translation.price} : </span>
                <p>{formatPrice(price)}</p>
              </div>
              <div className="single-container">
                <span>{translation.publisher} : </span>
                <p>{publisher}</p>
              </div>
              <div className="single-container">
                <span>{translation.language} : </span>
                <p>{language}</p>
              </div>
              <div className="single-container">
                <span>{translation.genre} : </span>
                <p>{genre}</p>
              </div>
              <div className="single-container">
                <span>{translation.year} : </span>
                <p>{year}</p>
              </div>
            </PropertiesContainer>
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
  .book-details {
    font-size: 1.25rem;
  }
  .author-btn {
    background: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    flex-direction: row;
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

  .secondary {
    margin: 2rem auto;
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
