import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

import { useAuthenticationContext } from "../../contexts/authentication_context";

const AddRating = () => {
    const navigate = useNavigate();

    const { header } = useAuthenticationContext();

    const [book, setBook] = useState({});
    const [rating_title, setRating_title] = useState("");
    const [rating, setRating] = useState(0);
    const [reviewer, setReviewer] = useState("");
    const [review, setReview] = useState("");

    const [bookList, setBookList] = useState([]);

    const loadBooks = () => {
        axios.get("/reviews/bookList").then((response) => {
            setBookList(response.data);
        });
    };

    const addReview = () => {
        axios
            .post("/reviews/addreview", {
                headers: header(),
                book,
                rating_title,
                rating,
                reviewer,
                review
            })
            .then((response) => {
                if (
                    response.data === "Token required" ||
                    response.data.auth === false
                )
                    return navigate("/admin/login", { replace: true });
            });

        navigate("/admin/ratingslist", { replace: true });
    };

    useEffect(() => {
        loadBooks();
    }, []);

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
                        {bookList.map((book) => {
                            return (
                                <option value={book.id}>{book.title}</option>
                            );
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
                        onChange={(e) => setReview(e.target.value)}
                    >
                        {review}
                    </textarea>
                    <button onClick={addReview} className="btn mt-1">
                        Add review
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
