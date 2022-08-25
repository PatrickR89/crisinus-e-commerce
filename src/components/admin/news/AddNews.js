import React, { useEffect } from "react";
import { FaCameraRetro } from "react-icons/fa";

import styled from "styled-components";

import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useLanguageContext } from "../../../contexts/language_context";
import { useNewsContext } from "../../../contexts/admin/news_context";

const AddNews = () => {
  const {
    news,
    loading,
    error,
    updateValue,
    handleAddImages,
    addNews,
    resetForm
  } = useNewsContext();
  const { title, text } = news;
  const { header } = useAuthenticationContext();
  const { translation } = useLanguageContext();

  useEffect(() => {
    resetForm();
  }, []);

  if (loading) {
    return (
      <main>
        <h2>Please wait, loading...</h2>
      </main>
    );
  }

  return (
    <Wrapper>
      <h2>
        {translation.add} {translation.news}
      </h2>
      <div className="info">
        <label htmlFor="images" className="photo-input">
          {translation.images}:
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
          <button onClick={() => addNews(header)} className="btn mt-1">
            {translation.add}
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
`;

export default AddNews;
