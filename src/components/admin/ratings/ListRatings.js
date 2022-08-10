import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { useLanguageContext } from "../../../contexts/language_context";

const ListRatings = () => {
    const { translation } = useLanguageContext();

    const [reviewsList, setReviewsList] = useState([]);

    const getReviews = () => {
        axios
            .get("/api/reviews/")
            .then((response) => {
                setReviewsList(response.data);
            })
            .catch((error) => {
                const err = `api: /reviews/ [listratings[GET]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };

    useEffect(() => {
        getReviews();
    }, []);

    return (
        <Wrapper>
            <h2>{translation.reviewsList.toUpperCase()}</h2>
            <div className="per-gift head">
                <section>ID</section>
                <section>{translation.bookTitle.toUpperCase()}</section>
                <section>{translation.title.toUpperCase()}</section>
                <section>{translation.rating.toUpperCase()}</section>
                <section>{translation.reviewer.toUpperCase()}</section>
                <section>{translation.review.toUpperCase()}</section>
            </div>
            {reviewsList.length > 0 &&
                reviewsList.map((review, index) => {
                    return (
                        <Link to={`/admin/editrating/${review.id}`}>
                            <div
                                key={index}
                                className={
                                    index % 2 === 0
                                        ? "itm-background-one per-gift on-hover-list"
                                        : "itm-background-two per-gift on-hover-list"
                                }
                            >
                                <p>{review.id}</p>

                                <h4>{review.book_title}</h4>

                                <p>{review.rating_title}</p>
                                <p>{review.rating}</p>
                                <p>{review.reviewer}</p>
                                {review.review && (
                                    <p>{review.review.substring(0, 15)}...</p>
                                )}
                            </div>
                        </Link>
                    );
                })}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    .head {
        margin-bottom: 2rem;
    }
    .per-gift {
        display: inline-grid;
        grid-template-columns: repeat(6, 1fr);
        align-items: center;
    }
`;

export default ListRatings;
