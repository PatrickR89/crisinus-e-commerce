import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa";

import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useLanguageContext } from "../../../contexts/language_context";
import { useNewsContext } from "../../../contexts/admin/news_context";
import WhenLoading from "../../public/WhenLoading";
import WhenError from "../../public/WhenError";

const EditNews = () => {
  const { id } = useParams();

  const {
    news,
    loading,
    error,
    updateValue,
    handleAddImages,
    handleDeleteImage,
    findById,
    editById,
    deleteById,
    clearError
  } = useNewsContext();
  const { title, images, text } = news;

  const { header } = useAuthenticationContext();
  const { translation } = useLanguageContext();

  useEffect(() => {
    findById(header, id);
  }, []);

  if (loading) {
    return <WhenLoading />;
  }

  if (error) {
    return <WhenError handleError={clearError} />;
  }

  return (
    <Wrapper>
      <h2>
        {translation.edit} {translation.news}
      </h2>
      <div className="thumb-container">
        {images &&
          images.map((url, index) => {
            return (
              <div key={index} className="single-thumb">
                <p>{url}</p>
                <img className="thumb" src={`/${url}`} alt="" />
                <button
                  className="btn btn-delete"
                  onClick={() => handleDeleteImage(url)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            );
          })}
      </div>
      <div className="info">
        <label htmlFor="images" className="photo-input">
          {translation.images}
          <input
            type="file"
            name="images"
            multiple
            id="images"
            className="hidden-input"
            onChange={handleAddImages}
          />
          <article className="btn">
            <FaCameraRetro className="icon-large" /> {translation.addImage}
          </article>
        </label>
        <label htmlFor="title">{translation.title}:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={updateValue}
        />
        <label htmlFor="text">{translation.content}:</label>
        <textarea
          name="text"
          id="text"
          cols="30"
          rows="10"
          value={text}
          onChange={updateValue}
        ></textarea>
        <div className="edit-container">
          <button onClick={() => editById(header, id)} className="btn mt-1">
            {translation.edit}
          </button>
          <button
            className="btn mt-1 btn-delete"
            onClick={() => deleteById(header, id)}
          >
            {translation.delete}
          </button>
        </div>
      </div>
    </Wrapper>
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
  .list-com {
    width: 20%;
    display: flex;
    flex-direction: row;
    .btn {
      margin: 0.2rem 0.5rem;
    }
  }
  .edit-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .thumb-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    height: 250px;
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
`;

export default EditNews;
