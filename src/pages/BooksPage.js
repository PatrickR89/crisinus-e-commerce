import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { FilterItems, BooksList, PageHero } from "../components";
import { useBooksContext } from "../contexts/books_context";
import { useFilterContext } from "../contexts/filter_context";
const BooksPage = () => {
  const {
    books: all_books,
    books_loading: loading,
    books_error: error
  } = useBooksContext();

  const { filtered_books } = useFilterContext();
  const [books, setBooks] = useState(all_books);

  useEffect(() => {
    setBooks(filtered_books);
  }, [filtered_books]);

  if (loading) {
    return (
      <div className="loading">
        <h1>Please wait...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading">
        <h1>Unfortunately an error occured</h1>
      </div>
    );
  }
  return (
    <main>
      <PageHero title="books" />
      <FilterItems />
      <Wrapper>
        <BooksList initialBooks={filtered_books} />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;

export default BooksPage;
