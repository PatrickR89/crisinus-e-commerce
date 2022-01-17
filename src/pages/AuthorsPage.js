import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { PageHero, SidebarAR, ListMenu, NoCurrentAuthor } from "../components";
import styled from "styled-components";
import { FaPenFancy } from "react-icons/fa";

import { useFetchItems } from "../hooks/useFetchItems";
import { useLanguageContext } from "../contexts/language_context";
import { useAuthorsContext } from "../contexts/authors_context";
import { useSidebarContext } from "../contexts/sidebar_context";

const AuthorsPage = ({}) => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const param = useParams();

  const {
    authorsList: authorArray,
    authorName,
    currentAuthor,
    isLoading,
    authorChange
  } = useAuthorsContext();

  const { loading, data, nextPage, prevPage } = useFetchItems(
    authorArray,
    5,
    setPage
  );

  const { translation } = useLanguageContext();

  const { openSidebarAR } = useSidebarContext();
  useEffect(() => {
    if (param.author_url) {
      authorChange(param.author_url);
    }
  }, []);

  const authorNavigate = (item) => {
    const authorTo = item.replace(/\s+/g, "-").toLowerCase();
    navigate(authorTo, { replace: true });
    authorChange(authorTo);
  };

  useEffect(() => {
    if (loading) return;
    setItems(data[page]);
  }, [loading, page, data]);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>{translation.pleaseWait}...</h1>
      </div>
    );
  }

  if (!currentAuthor) {
    return <NoCurrentAuthor authorNavigate={authorNavigate} />;
  }

  return (
    <main>
      <PageHero title={translation.authors} />
      <ToggleAuthors>
        <button className="btn" onClick={openSidebarAR}>
          <FaPenFancy />
        </button>
      </ToggleAuthors>
      <Wrapper>
        <ListMenu
          items={items}
          prevPage={prevPage}
          nextPage={nextPage}
          itemChange={authorNavigate}
          itemCriteria={authorName}
          length={authorArray.length}
          className="toggle-disp"
        />
        <Outlet />
      </Wrapper>
      <SidebarAR
        items={items}
        prevPage={prevPage}
        nextPage={nextPage}
        authorNavigate={authorNavigate}
        title={translation.authors}
        ver="authors"
      />
    </main>
  );
};

const ToggleAuthors = styled.div`
  height: 5vh;
  width: 100%;
  background-color: var(--clr-button-3);
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: -2rem;
  margin-bottom: 1rem;

  .btn {
    box-shadow: none;
    height: 100%;
    width: 35%;
    font-size: 1.5rem;
  }
  @media (min-width: 1000px) {
    display: none !important;
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin: 2rem 1rem;
`;

export default AuthorsPage;
