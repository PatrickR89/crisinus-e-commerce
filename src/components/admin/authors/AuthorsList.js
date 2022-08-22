import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useLanguageContext } from "../../../contexts/language_context";

import ListLinks from "../elements/ListLink";
import ListHead from "../elements/ListHead";

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

  const titles = ["ID", translation.name, "WEB LINK", "BIO"];

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <Wrapper>
      <h2>{translation.authorsList.toUpperCase()}</h2>
      <ListHead colTitles={titles} />
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
`;

export default AuthorsList;
