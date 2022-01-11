import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLanguageContext } from "../contexts/language_context";
import { useReviewsContext } from "../contexts/reviews_context";
import { useFetchItems } from "../hooks/useFetchItems";

import { PageHero, RatingStars, ListMenu } from "../components";

const ReviewsPage = () => {
  const { translation } = useLanguageContext();
  const {
    switchBook,
    currentBook,
    reviewsPerBook,
    isLoading,
    bookList,
    currentBookObject: cB
  } = useReviewsContext();

  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);

  const { loading, data } = useFetchItems(bookList, 5);

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

  return (
    <main>
      <PageHero title={translation.reviews} />
      <Wrapper>
        <ListMenu
          items={items}
          prevPage={prevPage}
          nextPage={nextPage}
          itemChange={switchBook}
          itemCriteria={currentBook}
          length={bookList.length}
          byId={true}
        />
        <div className="reviews">
          {cB ? (
            <h3
              style={{
                marginBottom: "2rem",
                fontStyle: "italic",
                textTransform: "capitalize"
              }}
            >
              {cB.title}
            </h3>
          ) : (
            ""
          )}
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
            {translation.shopBook}
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
