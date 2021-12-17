import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import mockGifts from "../mockData/mockGifts";
import { useFetchItems } from "../hooks/useFetchItems";
import { Gift } from "../components";

const GiftshopPage = () => {
  const { loading, data } = useFetchItems(mockGifts, 12);
  const [page, setPage] = useState(0);
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    if (loading) return;
    setGifts(data[page]);
  }, [loading, page]);

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

  return (
    <Wrapper>
      {!loading && (
        <div className="btn-container">
          <button className="btn" onClick={prevPage}>
            prev
          </button>
          <button className="btn" onClick={nextPage}>
            next
          </button>
        </div>
      )}
      <ul className="home-gifts">
        {gifts.map((item) => {
          return (
            <li key={item.id}>
              <Link to={`/giftshop/${item.id}`}>
                <Gift {...item} />
              </Link>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .home-gifts {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: start;
    justify-content: space-between;
    margin: 0.5rem;
  }
  .btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .btn {
      padding: 0.375rem 2.5rem;
    }
  }
`;

export default GiftshopPage;
