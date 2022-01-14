import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageHero, SidebarAR, BookComponent, ListMenu } from "../components";
import styled from "styled-components";
import { FaPenFancy } from "react-icons/fa";

import { useFetchItems } from "../hooks/useFetchItems";
import { useLanguageContext } from "../contexts/language_context";
import { useAuthorsContext } from "../contexts/authors_context";
import { useSidebarContext } from "../contexts/sidebar_context";

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

  const { openSidebarAR } = useSidebarContext();

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
      <ToggleAuthors>
        <button className="btn" onClick={openSidebarAR}>
          <FaPenFancy />
        </button>
      </ToggleAuthors>
      <Wrapper>
        <ListMenu
          items={items}
          prevPage={prevPage}
          nextPage={nextPage}
          itemChange={authorChange}
          itemCriteria={authorName}
          length={authorArray.length}
          className="toggle-disp"
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
      <SidebarAR
        items={items}
        prevPage={prevPage}
        nextPage={nextPage}
        title={translation.authors}
        ver="authors"
      />
    </main>
  );
};

const ToggleAuthors = styled.div`
  height: 5vh;
  width: 100%;
  background-color: var(--clr-button-3);
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: -2rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  .btn {
    box-shadow: none;
    height: 100%;
    width: 35%;
  }
  @media (min-width: 1000px) {
    display: none !important;
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin: 2rem 1rem;

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
    }
  }
  .image {
    img {
      max-width: 300px;
    }
  }
  ${
    "" /* .menu-left {
    margin-right: 2rem;
  } */
  }

  ${
    "" /* .center {
    width: 25%;
    margin: auto;
  }
  @media (max-width: 1000px) {
    flex-direction: column;
    .center {
      width: 60%;
    }
    .name-pic {
      flex-direction: column;
      align-items: center;
      margin: 1rem;
    }
    .toggle-disp-1000 {
      display: none !important;
    }
  }

  @media (max-width: 600px) {
    .center {
      width: 100%;
    }
  }  */
  }
`;

export default AuthorsPage;
