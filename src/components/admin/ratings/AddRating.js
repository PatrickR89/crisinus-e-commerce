import React, { useEffect } from "react";
import styled from "styled-components";

import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useLanguageContext } from "../../../contexts/language_context";
import { useReviewsContext } from "../../../contexts/admin/reviews_context";

const AddRating = () => {
  const { header } = useAuthenticationContext();
  const { translation } = useLanguageContext();
  const {
    review: object,
    books,
    loadBooks,
    addReview,
    resetForm,
    updateValue
  } = useReviewsContext();
  const { rating_title, rating, reviewer, review } = object;

  useEffect(() => {
    loadBooks();
    resetForm();
  }, []);

  return (
    <main>
      <Wrapper>
        <div className="info">
          <label htmlFor="book">{translation.selectBook}:</label>
          <select name="book" id="book" onChange={updateValue}>
            <option value="" selected disabled>
              {" "}
            </option>
            {books?.map((book) => {
              return <option value={book.id}>{book.title}</option>;
            })}
          </select>
          <label htmlFor="rating_title">{translation.title}:</label>
          <input
            type="text"
            name="rating_title"
            id="rating_title"
            onChange={updateValue}
            value={rating_title}
          />
          <label htmlFor="rating">{translation.rating}:</label>
          <input
            type="number"
            name="rating"
            id="rating"
            value={rating}
            min="0"
            max="5"
            onChange={updateValue}
          />
          <label htmlFor="reviewer">{translation.reviewer}:</label>
          <input
            type="text"
            name="reviewer"
            id="reviewer"
            value={reviewer}
            onChange={updateValue}
          />

          <label htmlFor="review">{translation.review}:</label>
          <textarea
            name="review"
            id="review"
            cols="30"
            rows="10"
            onChange={updateValue}
          >
            {review}
          </textarea>
          <button onClick={() => addReview(header)} className="btn mt-1">
            {translation.add}
          </button>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .info {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    margin-bottom: 2rem;
    label {
      font-size: 1.5rem;
      text-transform: capitalize;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }
    input {
      height: 2rem;
      font-size: 1.5rem;
      width: 100%;
    }
    select {
      height: 2rem;
      font-size: 1.5rem;
      width: 100%;
    }
    option:disabled {
      display: none;
    }
    textarea {
      width: 100%;
      font-size: 1.2rem;
    }
  }

  .list-com {
    width: 20%;
    display: flex;
    flex-direction: row;
    .btn {
      margin: 0.2rem 0.5rem;
    }
  }
`;

export default AddRating;
