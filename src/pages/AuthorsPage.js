import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "../components";
import mockBooks from "../mockData/mockBooks";
import mockAuthors from "../mockData/mockAuthors";
import styled from "styled-components";
import { BookComponent } from "../components";

const AuthorsPage = () => {
  const [authorArray, setAuthorArray] = useState([]);
  const [booksByAuthor, setBooksByAuthor] = useState([]);
  const [authorName, setAuthorName] = useState();
  const [currentAuthor, setCurrentAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAuthorArray([
      ...new Set(
        mockBooks
          .map((book) => {
            return book.authors.map((author) => {
              return `${author.name} ${author.last_name}`;
            });
          })
          .flat(1)
      )
    ]);
  }, []);

  useEffect(() => {
    setBooksByAuthor(booksPerAuthor(authorName));
    setCurrentAuthor(switchAuthor);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [authorName]);

  const booksPerAuthor = (name) => {
    return mockBooks.filter((book) => {
      return book.authors.find(
        (author) => `${author.name} ${author.last_name}` === `${name}`
      );
    });
  };

  const authorChange = (author) => {
    setIsLoading(true);
    setAuthorName(author);
  };

  const switchAuthor = mockAuthors.find(
    (author) => `${author.name} ${author.last_name}` === `${authorName}`
  );

  console.log(currentAuthor);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>please wait...</h1>
      </div>
    );
  }

  return (
    <main>
      <PageHero title="Authors" />
      <Wrapper>
        <div className="menu-left">
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
                <a href={currentAuthor.url}>More ...</a>
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
`;

export default AuthorsPage;
