import React from "react";
import styled from "styled-components";
import { useAuthorsContext } from "../contexts/authors_context";

const NoCurrentAuthor = ({ authorNavigate }) => {
  const {
    authorsList: authorArray,
    authorName,
    authorChange
  } = useAuthorsContext();
  return (
    <Wrapper className="solo">
      <div className="menu-left center">
        <ul>
          {authorArray.map((author, index) => {
            return (
              <li key={index}>
                <button
                  className={
                    author === authorName ? "btn select current" : " btn select"
                  }
                  disabled={author === authorName ? true : false}
                  onClick={() => authorNavigate(author)}
                >
                  {author}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 2rem 1rem;
`;

export default NoCurrentAuthor;
