import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useLanguageContext } from "../../../contexts/language_context";

import ListLinks from "../elements/ListLink";

const AuthorsList = () => {
  const { translation } = useLanguageContext();
  const [authorList, setAuthorList] = useState([]);

  const getAuthors = () => {
    axios
      .get("/api/authors/")
      .then((response) => {
        setAuthorList(response.data);
      })
      .catch((error) => {
        const err = `api: /api/authors/, error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <Wrapper>
      <h2>{translation.authorsList.toUpperCase()}</h2>
      <div className="per-author head">
        <section>ID</section>
        <section>{translation.name.toUpperCase()}</section>
        <section>WEB LINK</section>
        <section>BIO</section>
      </div>
      {authorList.length > 0 &&
        authorList.map((author, index) => {
          return (
            <ListLinks
              key={index}
              index={index}
              cols={4}
              url={`/admin/editauthor/${author.id}`}
            >
              <p>{author.id}</p>

              <h4>
                {author.name} {author.last_name}
              </h4>

              <p>{author.url}</p>
              {author.bio && <p>{author.bio.substring(0, 25)}...</p>}
            </ListLinks>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  .head {
    margin-bottom: 2rem;
  }
  .per-author {
    display: inline-grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
  }
`;

export default AuthorsList;
