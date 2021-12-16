import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import mockBooks from "../mockData/mockBooks";

const SingleBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    const tempBook = mockBooks.find((book) => book.id === id);
    setBook(tempBook);
    console.log(tempBook);
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

  return (
    <Wrapper>
      <div className="main">
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="authors">
          <p>Authors:</p>
          {authors.map((author) => {
            return (
              <p>
                <span>{author.last_name}</span> {author.name}
              </p>
            );
          })}
        </div>
        {images && <div className="images"></div>}
      </div>
      <div className="secondary">
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
      <div className="tertiary">
        <div className="about">
          <p>About :</p>
          <article>{desc}</article>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  margin: auto;
  .tertiary {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default SingleBookPage;
