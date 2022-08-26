import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useLanguageContext } from "../../../contexts/language_context";
import { useInfoContext } from "../../../contexts/admin/info_context";

const EditInfo = () => {
  const { id } = useParams();

  const { header } = useAuthenticationContext();
  const { translation } = useLanguageContext();
  const { item, updateValue, loading, error, findLinkById, editLinkById } =
    useInfoContext();
  const { link } = item;

  useEffect(() => {
    findLinkById(header, id);
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2>{item.id}</h2>
      <div className="info">
        <label htmlFor="link">{translation.link}:</label>
        <textarea
          name="link"
          id="link"
          cols="30"
          rows="10"
          value={link}
          onChange={updateValue}
        ></textarea>
        <div className="edit-container">
          <button onClick={() => editLinkById(header, id)} className="btn mt-1">
            {translation.edit}
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  h2 {
    color: var(--clr-red-dark);
  }
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

export default EditInfo;
