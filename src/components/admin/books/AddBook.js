import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCameraRetro } from "react-icons/fa";

import styled from "styled-components";

import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useLanguageContext } from "../../../contexts/language_context";
import { useBooksContext } from "../../../contexts/admin/books_context";

import { ImageSelectModal } from "../elements";

const AddBook = () => {
  const navigate = useNavigate();

  const { header, loggedIn } = useAuthenticationContext();
  const { translation } = useLanguageContext();
  const {
    book,
    authorsList,
    loadAuthors,
    handleAuthorInput,
    handleRemove,
    handleAdd,
    handleImages,
    handleUploadedImages,
    addBook,
    updateBook,
    resetForm
  } = useBooksContext();
  const {
    title,
    authors,
    genre,
    max_order,
    price,
    publisher,
    language,
    year,
    description
  } = book;

  const [isImageModal, setIsImageModal] = useState(false);

  function closeModal() {
    setIsImageModal(false);
  }

  function openModal() {
    setIsImageModal(true);
  }

  useEffect(() => {
    if (!loggedIn) {
      navigate("/admin/login", { replace: true });
    }
    resetForm();
    loadAuthors();
  }, []);

  return (
    <main>
      <Wrapper>
        <div className="info">
          <label htmlFor="title">{translation.title}:</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={updateBook}
            value={title}
          />
          <label htmlFor="authors">{translation.authors}:</label>
          <div className="authors" name="authors" id="authors">
            {authors.map((author, index) => {
              return (
                <div className="single-author" key={index}>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={author.name}
                    onChange={(e) => handleAuthorInput(e, index)}
                    placeholder={translation.name}
                    list="authorsNames"
                  />
                  <datalist id="authorsNames">
                    {authorsList.map((author, index) => {
                      return (
                        <option key={index} value={author.name}>
                          {author.name}
                        </option>
                      );
                    })}
                  </datalist>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={author.last_name}
                    onChange={(e) => handleAuthorInput(e, index)}
                    placeholder={translation.lastName}
                    list="autLast"
                  />
                  <datalist id="autLast">
                    {authorsList.map((author, index) => {
                      return (
                        <option key={index} value={author.last_name}>
                          {author.last_name}
                        </option>
                      );
                    })}
                  </datalist>
                  <div className="list-com">
                    {authors.length !== 1 && (
                      <button
                        className="btn"
                        onClick={() => handleRemove(index)}
                      >
                        {translation.remove}
                      </button>
                    )}
                    {authors.length - 1 === index && (
                      <button className="btn" onClick={handleAdd}>
                        {translation.add}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <label htmlFor="genre">{translation.genre}:</label>
          <input
            type="text"
            name="genre"
            id="genre"
            value={genre}
            onChange={updateBook}
          />
          <label htmlFor="publisher">{translation.publisher}:</label>
          <input
            type="text"
            name="publisher"
            id="publisher"
            value={publisher}
            onChange={updateBook}
          />
          <label htmlFor="language">{translation.language}:</label>
          <input
            type="text"
            name="language"
            id="language"
            value={language}
            onChange={updateBook}
          />
          <label htmlFor="images" className="photo-input">
            {translation.images}:
            <input
              type="file"
              name="images"
              multiple
              id="images"
              className="hidden-input"
              onChange={handleImages}
            />
            <article className="btn">
              <FaCameraRetro className="icon-large" /> {translation.addImage}
            </article>
          </label>
          <button className="btn" onClick={openModal}>
            <FaCameraRetro className="icon-large" /> Dodaj postojeću sliku
          </button>
          <label htmlFor="price">{translation.price}:</label>
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={updateBook}
          />
          <label htmlFor="year">{translation.year}:</label>
          <input
            type="number"
            name="year"
            id="year"
            value={year}
            onChange={updateBook}
          />
          <label htmlFor="max_order">{translation.maxAmount}:</label>
          <input
            type="number"
            name="max_order"
            id="max_order"
            value={max_order}
            onChange={updateBook}
          />
          <label htmlFor="description">{translation.description}:</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            onChange={updateBook}
            value={description}
          ></textarea>
          <button onClick={() => addBook(header)} className="btn mt-1">
            {translation.add}
          </button>
        </div>
      </Wrapper>
      {isImageModal && (
        <ImageSelectModal
          closeModal={closeModal}
          handleClick={handleUploadedImages}
        />
      )}
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
    textarea {
      width: 100%;
      font-size: 1.2rem;
    }
  }
  .authors {
    width: 100%;
  }
  .hidden-input {
    display: none;
  }
  .icon-large {
    font-size: 1.2rem;
  }
  .photo-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    article {
      margin-top: 0.5rem;
    }
  }
  .single-author {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    input {
      margin: 1rem;
      width: 40%;
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

export default AddBook;
