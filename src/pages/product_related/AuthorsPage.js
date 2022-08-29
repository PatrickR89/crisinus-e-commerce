import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaPenFancy } from "react-icons/fa";

import { useFetchItems } from "../../hooks/useFetchItems";
import { useLanguageContext } from "../../contexts/language_context";
import { useAuthorsContext } from "../../contexts/authors_context";
import { useSidebarContext } from "../../contexts/sidebar_context";

import { NoCurrentAuthor } from "../../components/public/authors";
import {
  PageHero,
  SidebarAR,
  ListMenu
} from "../../components/public/elements";

import WhenLoading from "../../components/public/WhenLoading";

const AuthorsPage = () => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const { isLoading, authors, changeAuthor, activeAuthor } =
    useAuthorsContext();

  const { loading, data, nextPage, prevPage } = useFetchItems(
    authors,
    5,
    setPage
  );

  const { translation } = useLanguageContext();

  const { openSidebarAR } = useSidebarContext();

  useEffect(() => {
    if (activeAuthor.id) {
      authorNavigate(activeAuthor.id);
    }

    if (params.author_url) {
      authorNavigate(params.author_url);
    }
    // eslint-disable-next-line
  }, []);

  const authorNavigate = (item) => {
    navigate(item, { replace: true });
    changeAuthor(item);
  };

  useEffect(() => {
    if (loading) return;
    setItems(data[page]);
  }, [loading, page, data]);

  if (isLoading) {
    return <WhenLoading />;
  }

  if (!activeAuthor.id) {
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
          byId={true}
          itemCriteria={activeAuthor.id}
          length={authors.length}
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
