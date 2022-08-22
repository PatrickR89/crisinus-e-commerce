import React, { useState, useEffect } from "react";
import axios from "axios";

import { useLanguageContext } from "../../../contexts/language_context";

import { ListHead, ListLink, ListWrapper } from "../elements";

const ListRatings = () => {
  const { translation } = useLanguageContext();
  const { bookTitle, title, rating, reviewer, review } = translation;
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

  const titles = ["ID", bookTitle, title, rating, reviewer, review];

  return (
    <ListWrapper>
      <h2>{translation.reviewsList.toUpperCase()}</h2>
      <ListHead colTitles={titles} />
      {reviewsList.length > 0 &&
        reviewsList.map((review, index) => {
          return (
            <ListLink
              key={index}
              index={index}
              cols={6}
              url={`/admin/editrating/${review.id}`}
            >
              <p>{review.id}</p>

              <h4>{review.book_title}</h4>

              <p>{review.rating_title}</p>
              <p>{review.rating}</p>
              <p>{review.reviewer}</p>
              {review.review && <p>{review.review.substring(0, 15)}...</p>}
            </ListLink>
          );
        })}
    </ListWrapper>
  );
};

export default ListRatings;
