import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Slideshow, PageHero, AddToCart } from "../components";
import mockBooks from "../mockData/mockBooks";

const SingleBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tempBook = mockBooks.find((book) => book.id === parseInt(id));
    setBook(tempBook);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [id]);

  const { title, authors, images, price, publisher, language, year, desc } =
    book;

  if (loading) {
    return (
      <div className="loading">
        <h1>Please wait...</h1>
      </div>
    );
  }

  return (
    <main>
      <PageHero title={title} adress="books" />
      <Wrapper>
        <div className="main">
          <div className="title">
            <h1>{title}</h1>
          </div>
          <div className="info">
            {authors.length > 1 ? (
              <p className="tag">Authors:</p>
            ) : (
              <p className="tag">Author:</p>
            )}
            {authors.map((author) => {
              return (
                <p>
                  <span key={author.last_name} className="info-data">
                    {author.last_name}
                  </span>{" "}
                  {author.name}
                </p>
              );
            })}
          </div>
          {images && <Slideshow images={images} />}
          <div className="layout">
            <div className="info">
              <div>
                <p className="tag">Price : </p>
                <span className="info-data">{price / 100}kn</span>
              </div>
              <div>
                <p className="tag">Publisher : </p>
                <span className="info-data">{publisher}</span>
              </div>
              <div>
                <p className="tag">Language : </p>
                <span className="info-data">{language}</span>
              </div>
              <div>
                <p className="tag">Year : </p>
                <span className="info-data">{year}</span>
              </div>
            </div>
            <AddToCart product={book} />
          </div>
        </div>
        <div className="secondary">
          <div className="about">
            <p className="tag">About :</p>
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
