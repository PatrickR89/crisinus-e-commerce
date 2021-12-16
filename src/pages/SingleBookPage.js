import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import mockBooks from "../mockData/mockBooks";

const SingleBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tempBook = mockBooks.find((book) => book.id == id);
    setBook(tempBook);
    setLoading(false);
  }, [id]);

  const {
    title,
    authors,
    images,
    stock,
    price,
    publisher,
    language,
    year,
    desc
  } = book;

  if (loading) {
    return (
      <div className="loading">
        <h1>LOADING...</h1>
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="main">
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="authors">
          {authors.length > 1 ? <p>Authors:</p> : <p>Author:</p>}
          {authors.map((author) => {
            return (
              <p>
                <span>{author.last_name}</span> {author.name}
              </p>
            );
          })}
        </div>
        {images && <div className="images"></div>}
        <div className="info">
          <p>
            Price : <span>{price}kn</span>
          </p>
          <p>
            Publisher : <span>{publisher}</span>
          </p>
          <p>
            Language : <span>{language}</span>
          </p>
          <p>
            Year : <span>{year}</span>
          </p>
        </div>
      </div>
      <div className="secondary">
        <div className="about">
          <p>About :</p>
          <article>{desc}</article>
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
    margin: auto;
  }
  .authors {
    text-transform: capitalize;
  }
  .info {
    span {
      font-weight: bold;
    }
  }
  .secondary {
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90vw;
    .about {
      align-items: center;
    }
  }
`;

export default SingleBookPage;
