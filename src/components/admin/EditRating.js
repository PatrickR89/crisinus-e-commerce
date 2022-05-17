import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

import { useAuthenticationContext } from "../../contexts/authentication_context";

const EditRating = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { header } = useAuthenticationContext();

  const [initialReview, setInitialReview] = useState({
    book_id: "",
    book_title: "",
    rating_title: "",
    rating: 0,
    reviewer: "",
    review: ""
  });

  const [book, setBook] = useState({});
  const [rating_title, setRating_title] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewer, setReviewer] = useState("");
  const [review, setReview] = useState("");

  const [bookList, setBookList] = useState([]);

  const loadInitialReview = () => {
    axios
      .post("http://localhost:3001/reviews/getInitialReview", {
        headers: header(),
        id
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        setInitialReview(response.data);
      });
  };

  const initializeReview = () => {
    setBook(initialReview.book_id);
    setRating_title(initialReview.rating_title);
    setRating(initialReview.rating);
    setReviewer(initialReview.reviewer);
    setReview(initialReview.review);
  };

  const loadBooks = () => {
    axios
      .get("http://localhost:3001/reviews/bookList")
      .then((response) => {
        setBookList(response.data);
      })
      .then((response) => {
        if (response.data === "Token required")
          return navigate("/admin/login", { replace: true });
      });
  };

  const editReview = () => {
    axios
      .put("http://localhost:3001/reviews/editreview", {
        headers: header(),
        id,
        book,
        rating_title,
        rating,
        reviewer,
        review
      })
      .then((response) => {
        if (response.data === "Token required")
          return navigate("/admin/login", { replace: true });
      });

    navigate("/admin/ratingslist", { replace: true });
  };

  const handleDelete = () => {
    axios
      .delete("http://localhost:3001/reviews/deletereview", {
        headers: header(),
        data: { id: id }
      })
      .then((response) => {
        if (response.data === "Token required")
          return navigate("/admin/login", { replace: true });
      });
    navigate("/admin/ratingslist", { replace: true });
  };

  useEffect(() => {
    loadInitialReview();
    loadBooks();
  }, []);
  useEffect(() => {
    initializeReview();
  }, [initialReview]);

  return (
    <main>
      <Wrapper>
        <div className="info">
          <label htmlFor="book">Select book:</label>
          <select
            name="book"
            id="book"
            onChange={(e) => setBook(e.target.value)}
          >
            <option value={initialReview.book_id} selected="selected">
              {initialReview.book_title}
            </option>
            {bookList.map((book) => {
              return <option value={book.id}>{book.title}</option>;
            })}
          </select>
          <label htmlFor="rating_title">Title:</label>
          <input
            type="text"
            name="rating_title"
            id="rating_title"
            onChange={(e) => setRating_title(e.target.value)}
            value={rating_title}
          />
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            name="rating"
            id="rating"
            value={rating}
            min="0"
            max="5"
            onChange={(e) => setRating(e.target.value)}
          />
          <label htmlFor="reviewer">Reviewer:</label>
          <input
            type="text"
            name="reviewer"
            id="reviewer"
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
          />

          <label htmlFor="review">Review:</label>
          <textarea
            name="review"
            id="review"
            cols="30"
            rows="10"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <div className="edit-container">
            <button onClick={editReview} className="btn mt-1">
              Edit review
            </button>
            <button onClick={handleDelete} className="btn mt-1 btn-delete">
              DELETE review
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
