import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { useLanguageContext } from "../../../contexts/language_context";

import ListLink from "../elements/ListLink";
import ListHead from "../elements/ListHead";

const ListLinks = () => {
  const [linkList, setLinkList] = useState([]);

  const { translation } = useLanguageContext();
  const titles = ["ID", "link"];
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
      <ListHead colTitles={titles} />
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
`;

export default ListLinks;
