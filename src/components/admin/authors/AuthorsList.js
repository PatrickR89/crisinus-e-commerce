import React, { useEffect } from "react";
import { useLanguageContext } from "../../../contexts/language_context";
import { useAuthorsContext } from "../../../contexts/admin/authors_context";

import { ListHead, ListLink, ListWrapper } from "../elements";

const AuthorsList = () => {
  const { translation } = useLanguageContext();
  const { authorList, getAuthors } = useAuthorsContext();
  const titles = ["ID", translation.name, "WEB LINK", "BIO"];

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <ListWrapper>
      <h2>{translation.authorsList.toUpperCase()}</h2>
      <ListHead colTitles={titles} />
      {authorList.length > 0 &&
        authorList.map((author, index) => {
          return (
            <ListLink
              key={index}
              index={index}
              cols={4}
              url={`/admin/authors/${author.id}`}
            >
              <p>{author.id}</p>

              <h4>
                {author.name} {author.last_name}
              </h4>

              <p>{author.url}</p>
              {author.bio && <p>{author.bio.substring(0, 25)}...</p>}
            </ListLink>
          );
        })}
    </ListWrapper>
  );
};

export default AuthorsList;
