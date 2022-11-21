import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useAuthorsContext } from "../../../contexts/authors_context";
import { useLanguageContext } from "../../../contexts/language_context";

import { BookComponent } from "../books";

const CurrentAuthor = () => {
  const { booksByAuthor, activeAuthor } = useAuthorsContext();
  const { translation } = useLanguageContext();

  return (
    <Wrapper>
      {activeAuthor.id && (
        <div className="about-author">
          <article className="name-about">
            <div className="name-pic">
              <div className="image">
                {activeAuthor.img.length > 0 && (
                  <img src={`/${activeAuthor.img[0]}`} alt="" />
                )}
              </div>
              <div className="name">
                <h2 className="title">
                  {activeAuthor.name} {activeAuthor.last_name}
                </h2>
              </div>
            </div>
            <div className="bio">
              <p className="line-break">{activeAuthor.bio}</p>
              <a href={activeAuthor.url}>{translation.more} ...</a>
            </div>
          </article>
          <div className="books">
            <ul>
              {booksByAuthor.map((book) => {
                return (
                  <li key={book.id}>
                    <Link to={`/books/${book.id}`}>
                      <BookComponent {...book} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: auto;
  .about-author: {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    padding-left: 2rem;
  }
  .name-about {
    display: block;
    align-items: start;
  }
  .name-pic {
    display: flex;
    align-items: start;
    justify-content: start;
    margin-bottom: 2rem;
  }
  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
  .books {
    overflow: auto;
    ul {
      display: flex;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .image {
    img {
      max-width: 300px;
    }
  }

  @media (max-width: 1000px) {
    .name-pic {
      flex-direction: column;
      align-items: center;
      margin: 1rem;
      .image {
        margin-bottom: 2rem;
      }
    }
    .books {
      ul {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
  @media (max-width: 550px) {
    .books {
      ul {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
`;

export default CurrentAuthor;
