import React, { useEffect } from "react";

import { useLanguageContext } from "../../../contexts/language_context";
import { useReviewsContext } from "../../../contexts/admin/reviews_context";

import { ListHead, ListLink, ListWrapper } from "../elements";

const ListRatings = () => {
  const { translation } = useLanguageContext();
  const { bookTitle, title, rating, reviewer, review } = translation;
  const { reviews, getReviews } = useReviewsContext();

  useEffect(() => {
    getReviews();
  }, []);

  const titles = ["ID", bookTitle, title, rating, reviewer, review];

  return (
    <ListWrapper>
      <h2>{translation.reviewsList.toUpperCase()}</h2>
      <ListHead colTitles={titles} />
      {reviews?.length > 0 &&
        reviews?.map((review, index) => {
          return (
            <ListLink
              key={index}
              index={index}
              cols={6}
              url={`/admin/reviews/${review.id}`}
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
