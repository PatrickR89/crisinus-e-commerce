import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFetchItems } from "../hooks/useFetchItems";
import { useLanguageContext } from "../contexts/language_context";

const BooksList = ({ initialItems, SingleItem, url, pageItems }) => {
  const { translation } = useLanguageContext();

  const { loading, data } = useFetchItems(initialItems, pageItems);
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [nbPages, setNbPages] = useState(0);

  useEffect(() => {
    if (loading) return;
    setItems(data[page]);
    setNbPages(Math.ceil(initialItems.length / pageItems));
  }, [loading, page, data]);

  useEffect(() => {
    setPage(0);
  }, [initialItems]);

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

  if (initialItems.length < 1 || !items) {
    return (
      <div
        style={{
          background: "hsl(45, 88%, 60%)",
          padding: "1rem 0",
          marginTop: "-2rem"
        }}
      >
        <h2>{translation.noProducts}...</h2>
      </div>
    );
  }

  return (
    <Wrapper>
      {!loading && initialItems.length > pageItems && (
        <div className="btn-container">
          <button className="btn" onClick={prevPage}>
            {translation.prev}
          </button>
          <p>{`${page + 1} / ${nbPages}`}</p>
          <button className="btn" onClick={nextPage}>
            {translation.next}
          </button>
        </div>
      )}
      <ul className="home-books">
        {items.map((item) => {
          return (
            <li key={item.id}>
              <Link to={`${url}${item.id}`}>
                <SingleItem {...item} />
              </Link>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  .home-books {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: start;
    justify-content: space-between;
    margin: 1rem;
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

export default BooksList;
