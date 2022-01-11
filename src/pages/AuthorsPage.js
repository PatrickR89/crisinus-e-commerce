import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "../components";
import styled from "styled-components";

import { BookComponent, ListMenu } from "../components";
import { useFetchItems } from "../hooks/useFetchItems";
import { useLanguageContext } from "../contexts/language_context";
import { useAuthorsContext } from "../contexts/authors_context";

const AuthorsPage = () => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);

  const {
    authorsList: authorArray,
    authorName,
    currentAuthor,
    booksByAuthor,
    isLoading,
    authorChange
  } = useAuthorsContext();

  const { loading, data } = useFetchItems(authorArray, 5);

  const { translation } = useLanguageContext();

  useEffect(() => {
    if (loading) return;
    setItems(data[page]);
  }, [loading, page, data]);

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1;
      }
      return prevPage;
    });
  };

  if (isLoading) {
    return (
      <div className="loading">
        <h1>{translation.pleaseWait}...</h1>
      </div>
    );
  }

  if (!currentAuthor) {
    return (
      <Wrapper className="solo">
        <div className="menu-left center">
          <ul>
            {authorArray.map((author, index) => {
              return (
                <li key={index}>
                  <button
                    className={
                      author === authorName
                        ? "btn select current"
                        : " btn select"
                    }
                    disabled={author === authorName ? true : false}
                    onClick={() => authorChange(author)}
                  >
                    {author}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Wrapper>
    );
  }

  return (
    <main>
      <PageHero title={translation.authors} />
      <Wrapper>
        <ListMenu
          items={items}
          prevPage={prevPage}
          nextPage={nextPage}
          itemChange={authorChange}
          itemCriteria={authorName}
          length={authorArray.length}
        />
        {authorName && (
          <div className="about-author">
            <article className="name-about">
              <div className="name-pic">
                <div className="image">
                  <img src={currentAuthor.img} alt="" />
                </div>
                <div className="name">
                  <h2 className="title">{authorName}</h2>
                </div>
              </div>
              <div className="bio">
                <p>{currentAuthor.bio}</p>
                <a href={currentAuthor.url}>{translation.more} ...</a>
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
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;

  .about-author: {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75%;
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
    }
  }
  .image {
    img {
      max-width: 300px;
    }
  }
  .menu-left {
    margin-right: 2rem;
  }

  .center {
    width: 25%;
    margin: auto;
  }
  @media (max-width: 1000px) {
  .center {
    width: 60%;

  }
  @media (max-width: 600px) {
  .center {
    width: 100%;
  }
`;

export default AuthorsPage;
