import React, { useEffect, useState } from "react";

import { useLanguageContext } from "../../../contexts/language_context";
import { useBooksContext } from "../../../contexts/admin/books_context";

import { ListHead, ListLink, ListWrapper } from "../elements";
import WhenLoading from "../../public/WhenLoading";
import WhenError from "../../public/WhenError";
import DimensionModal from "../elements/DimensionModal";
import BookPropsModal from "../elements/BookPropsModal";
import formatPrice from "../../../utils/formatPrice";

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

  const [isDimensionModal, setIsDimensionModal] = useState(false);
  const [isPropModal, setIsPropModal] = useState(false);
  const [bookForModal, setBookForModal] = useState({ id: "", name: "" });

  function closeDimensionModal() {
    setIsDimensionModal(false);
  }
  function openDimensionModal(id, title) {
    setBookForModal({ id: id, name: title });
    setIsDimensionModal(true);
  }
  function closePropertiesModal() {
    setIsPropModal(false);
  }
  function openPropertiesModal(id, title) {
    setBookForModal({ id: id, name: title });
    setIsPropModal(true);
  }

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
    <>
      <ListWrapper>
        <h2>{translation.booksList.toUpperCase()}</h2>
        <ListHead colTitles={titles} btn="2" />
        {booksList?.length !== undefined &&
          booksList?.length > 0 &&
          booksList?.map((book, index) => {
            return (
              <div className="item-row" key={book.id}>
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
                      const author = authorsList.find(
                        (author) => author.id === id
                      );
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
                  <p>{formatPrice(book.price)}</p>
                </ListLink>
                <button
                  className="btn"
                  onClick={() => openDimensionModal(book.id, book.title)}
                >
                  Dim.
                </button>
                <button
                  className="btn"
                  onClick={() => openPropertiesModal(book.id, book.title)}
                >
                  Kar.
                </button>
              </div>
            );
          })}
      </ListWrapper>
      {isDimensionModal && (
        <DimensionModal closeModal={closeDimensionModal} item={bookForModal} />
      )}
      {isPropModal && (
        <BookPropsModal closeModal={closePropertiesModal} item={bookForModal} />
      )}
    </>
  );
};

export default BookList;
