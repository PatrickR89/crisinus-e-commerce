import React from "react";
import { PageHero } from "../components";
import mockBooks from "../mockData/mockBooks";

const AuthorsPage = () => {
  let authArray = mockBooks
    .map((book, index) => {
      console.log(book.authors);
      return book.authors.map((author) => {
        return `${author.name} ${author.last_name}`;
      });
    })
    .flat(1);

  const uniqueAuth = [...new Set(authArray)];
  console.log(uniqueAuth);

  return (
    <main>
      <PageHero title="Authors" />
      <h2>authors page</h2>
    </main>
  );
};

export default AuthorsPage;
