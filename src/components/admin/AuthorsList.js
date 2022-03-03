import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const AuthorsList = () => {
  const [authorList, setAuthorList] = useState([]);

  const getAuthors = () => {
    axios.get("http://localhost:3001/authors/authorlist").then((response) => {
      setAuthorList(response.data);
    });
  };

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <Wrapper>
      AuthorsList
      <div className="per-author head">
        <section>ID</section>
        <section>NAME</section>
        <section>WEB LINK</section>
        <section>BIO</section>
      </div>
      {authorList.length > 0 &&
        authorList.map((author, index) => {
          return (
            <div
              key={index}
              className={
                index % 2 === 0
                  ? "itm-background-one per-author"
                  : "itm-background-two per-author"
              }
            >
              <p>{author.id}</p>
              <Link to={`/admin/editauthor/${author.id}`}>
                <h4>
                  {author.name} {author.last_name}
                </h4>
              </Link>
              <p>{author.url}</p>
              <p>{author.bio}</p>
            </div>
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
