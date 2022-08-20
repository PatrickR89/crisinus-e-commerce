import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { useLanguageContext } from "../../../contexts/language_context";

import ListLink from "../elements/ListLink";

const ListLinks = () => {
  const [linkList, setLinkList] = useState([]);

  const { translation } = useLanguageContext();

  const getLinks = () => {
    axios
      .get("/api/links")
      .then((response) => {
        setLinkList(response.data);
      })
      .catch((error) => {
        const err = `api: /api/links/ [linkslist[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <Wrapper>
      <h2>{translation.links.toUpperCase()}</h2>
      <div className="per-page head">
        <section>ID</section>
        <section>LINK</section>
      </div>
      {linkList.length > 0 &&
        linkList.map((singleLink, index) => {
          return (
            <ListLink
              key={index}
              index={index}
              cols={2}
              url={`/admin/editlink/${singleLink.id}`}
            >
              <p>{singleLink.id.toUpperCase()}</p>
              {singleLink.link && <p>{singleLink.link.substring(0, 20)}...</p>}
            </ListLink>
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
  .per-page {
    display: inline-grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    width: 100%;
    padding: 0.5rem;
  }
`;

export default ListLinks;
