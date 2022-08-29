import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";

import { FaCameraRetro } from "react-icons/fa";

import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useLanguageContext } from "../../../contexts/language_context";
import { useBooksContext } from "../../../contexts/admin/books_context";

import WhenLoading from "../../public/WhenLoading";

const EditBook = () => {
  axios.defaults.withCredentials = true;
  const {
    book,
    loadAuthors,
    handleAuthorInput,
    handleRemove,
    handleAdd,
    handleImages,
    handleDelete,
    authorsList,
    findById,
    editById,
    deleteById,
    updateBook,
    loading,
    error
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
    description,
    images
  } = book;

  const { id } = useParams();
  const { header } = useAuthenticationContext();
  const { translation } = useLanguageContext();

  useEffect(() => {
    findById(id, header);
    loadAuthors();
  }, []);

  if (loading) {
    return <WhenLoading />;
  }

  return (
    <main>
      <Wrapper>
        <div className="edit-header">
          <h4>{title}</h4>
          <div className="thumb-container">
            {images.map((url, index) => {
              return (
                <div key={index} className="single-thumb">
                  <p>{url}</p>
                  <img className="thumb" src={`/${url}`} alt="" />
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(url)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

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
                    {authorsList.map((author) => {
                      return <option value={author.name}>{author.name}</option>;
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
                    {authorsList.map((author) => {
                      return (
                        <option value={author.last_name}>
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
            {authors.length === 0 && (
              <button className="btn" onClick={handleAdd}>
                {translation.add}
              </button>
            )}
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
            value={description}
            onChange={updateBook}
          ></textarea>
          <div className="edit-container">
            <button onClick={() => editById(id, header)} className="btn mt-1">
              {translation.edit}
            </button>
            <button
              className="btn mt-1 btn-delete"
              onClick={() => deleteById(id, header)}
            >
              {translation.delete}
            </button>
          </div>
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
    textarea {
      width: 100%;
      font-size: 1.2rem;
    }
  }
  .edit-header {
    height: 250px;
    margin-bottom: 2rem;
  }
  .thumb-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
  }
  .single-thumb {
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-between;
    height: 100%;
    max-width: 200px;
  }
  .thumb {
    max-width: 150px;
    margin: auto;
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
  img {
    max-width: 200px;
  }
  .edit-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export default EditBook;
