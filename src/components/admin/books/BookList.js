import React, { useEffect } from "react";

import { useCurrencyContext } from "../../../contexts/currency_context";
import { useLanguageContext } from "../../../contexts/language_context";
import { useBooksContext } from "../../../contexts/admin/books_context";

import { ListHead, ListLink, ListWrapper } from "../elements";
import WhenLoading from "../../public/WhenLoading";
import WhenError from "../../public/WhenError";

const BookList = () => {
  const {
    loadBooks,
    loadAuthors,
    booksList,
    authorsList,
    loading,
    error,
    clearError
  } = useBooksContext();

  const { priceFormat } = useCurrencyContext();
  const { translation } = useLanguageContext();
  const { title, authors, year, language, price } = translation;

  const titles = ["ID", title, authors, year, language, price];

  useEffect(() => {
    loadBooks();
    loadAuthors();
  }, []);

  if (loading) {
    return <WhenLoading />;
  }

  if (error) {
    return <WhenError handleError={clearError} />;
  }

  return (
    <ListWrapper>
      <h2>{translation.booksList.toUpperCase()}</h2>
      <ListHead colTitles={titles} />
      {booksList.map((book, index) => {
        return (
          <ListLink
            key={index}
            index={index}
            cols={6}
            url={`/admin/books/${book.id}`}
          >
            <p>{book.id}</p>
            <h4>{book.title}</h4>

            <div>
              {book.authors.map((id, index) => {
                const author = authorsList.find((author) => author.id === id);
                if (author) {
                  return (
                    <p key={index}>
                      {author.name} {author.last_name}
                    </p>
                  );
                }
              })}
            </div>
            <p>{book.year}</p>
            <p>{book.language}</p>
            <p>{priceFormat(book.price)}</p>
          </ListLink>
        );
      })}
    </ListWrapper>
  );
};

export default BookList;
