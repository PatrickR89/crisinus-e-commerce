import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { PageHero, RatingStars } from "../components";
import mockReviews from "../mockData/mockReviews";
import mockBooks from "../mockData/mockBooks";

const ReviewsPage = () => {
  const [bookIds, setBookIds] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [reviewsPerBook, setReviewsPerBook] = useState([]);
  const [currentBook, setCurrentBook] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setBookIds([
      ...new Set(
        mockReviews.map((review) => {
          return review.bookId;
        })
      )
    ]);
  }, []);

  useEffect(() => {
    setBookList(
      bookIds
        .map((id) => {
          return mockBooks.filter((book) => book.id === id);
        })
        .flat(1)
    );
  }, [bookIds]);

  useEffect(() => {
    setReviewsPerBook(bookReviews(currentBook));
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [currentBook]);

  const switchBook = (id) => {
    setIsLoading(true);
    setCurrentBook(id);
  };

  const bookReviews = (id) => {
    return mockReviews.filter((review) => review.bookId === id);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Please wait...</h1>
      </div>
    );
  }

  return (
    <main>
      <PageHero title="reviews" />
      <Wrapper>
        <div className="menu-left">
          <ul>
            {bookList.map((book) => {
              return (
                <li key={book.id}>
                  <button
                    className={
                      book.id === currentBook
                        ? "btn select current"
                        : " btn select"
                    }
                    disabled={book.id === currentBook ? true : false}
                    onClick={() => switchBook(book.id)}
                  >
                    {book.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="reviews">
          {reviewsPerBook.map((review) => {
            return (
              <div key={review.id}>
                <h2>{review.title}</h2>
                <div className="stars-container">
                  <RatingStars stars={review.rating} />
                </div>
                <article>{review.review}</article>
                <div className="reviewer">
                  <h4>~{review.reviewer}</h4>
                </div>
              </div>
            );
          })}
          <Link to={`/books/${currentBook}`} className="btn">
            Shop book
          </Link>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  .reviews {
    width: 75%;
  }

  .reviewer {
    display: flex;
    width: 100%;
    justify-content: end;
    color: var(--clr-primary-4);
    font-style: italic;
  }
  .stars-container {
    display: flex;
    justify-content: center;
  }
`;

export default ReviewsPage;
