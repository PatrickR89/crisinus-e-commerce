import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaBook } from "react-icons/fa";
import { useLanguageContext } from "../../contexts/language_context";
import { useReviewsContext } from "../../contexts/reviews_context";
import { useSidebarContext } from "../../contexts/sidebar_context";
import { useFetchItems } from "../../hooks/useFetchItems";
import WhenLoading from "../../components/public/WhenLoading";

import {
  PageHero,
  ListMenu,
  SidebarAR,
  RatingStars
} from "../../components/public/elements";

const ReviewsPage = () => {
  const navigate = useNavigate();
  const { translation } = useLanguageContext();
  const { openSidebarAR } = useSidebarContext();
  const {
    switchBook,
    currentBook,
    reviewsPerBook,
    isLoading,
    bookList,
    currentBookObject: cB,
    isError
  } = useReviewsContext();

  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);

  const { loading, data } = useFetchItems(bookList, 5);

  useEffect(() => {
    if (loading) return;
    setItems(data[page]);
  }, [loading, page, data]);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    }
    // eslint-disable-next-line
  }, [isError]);

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
    return <WhenLoading />;
  }

  if (isError) {
    return (
      <div className="loading">
        <h1>Error...</h1>
      </div>
    );
  }

  if (!cB) {
    return (
      <NoCB className="solo">
        <div className="menu-left center">
          <ul>
            {bookList.map((book, index) => {
              return (
                <li key={index}>
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
      </NoCB>
    );
  }

  return (
    <main>
      <PageHero title={translation.reviews} />
      <ToggleBooks>
        <button className="btn" onClick={openSidebarAR}>
          <FaBook />
        </button>
      </ToggleBooks>
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
      <SidebarAR
        items={items}
        prevPage={prevPage}
        nextPage={nextPage}
        title={translation.reviews}
        ver="reviews"
      />
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
  @media (max-width: 1000px) {
    align-items: center;
    .reviews {
      width: 100%;
      margin: 1rem 1rem 2rem 1rem;
    }
  }
`;
const NoCB = styled.div`
  display: flex;
  margin: 2rem 1rem;
`;
const ToggleBooks = styled.div`
  height: 5vh;
  width: 100%;
  background-color: var(--clr-button-3);
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: -2rem;
  margin-bottom: 1rem;

  .btn {
    box-shadow: none;
    height: 100%;
    width: 35%;
    font-size: 1.5rem;
  }
  @media (min-width: 1000px) {
    display: none !important;
  }
`;

export default ReviewsPage;
