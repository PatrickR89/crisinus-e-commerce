import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useLanguageContext } from "../../../contexts/language_context";
import { useReviewsContext } from "../../../contexts/admin/reviews_context";
import WhenLoading from "../../public/WhenLoading";
import WhenError from "../../public/WhenError";

const EditRating = () => {
  const { id } = useParams();

  const { header } = useAuthenticationContext();
  const { translation } = useLanguageContext();
  const {
    review: object,
    books,
    loadBooks,
    updateValue,
    findById,
    editById,
    deleteById,
    loading,
    error,
    clearError
  } = useReviewsContext();
  const { rating_title, rating, reviewer, review, book_id, book_title, book } =
    object;

  useEffect(() => {
    findById(header, id);
    loadBooks();
  }, []);

  if (loading) {
    return <WhenLoading />;
  }

  if (error) {
    return <WhenError handleError={clearError} />;
  }

  return (
    <main>
      <Wrapper>
        <h2>
          {translation.edit} {translation.reviews}
        </h2>
        <div className="info">
          <label htmlFor="book">{translation.selectBook}:</label>
          <select name="book" id="book" onChange={updateValue}>
            <option value={book_id} selected="selected">
              {book_title}
            </option>
            {books?.map((book, index) => {
              return (
                <option key={index} value={book.id}>
                  {book.title}
                </option>
              );
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
            value={review}
            onChange={updateValue}
          ></textarea>
          <div className="edit-container">
            <button onClick={() => editById(header, id)} className="btn mt-1">
              {translation.edit}
            </button>
            <button
              onClick={() => deleteById(header, id)}
              className="btn mt-1 btn-delete"
            >
              {translation.delete}
            </button>
          </div>
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

  .edit-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export default EditRating;
