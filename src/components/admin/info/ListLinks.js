import React, { useEffect } from "react";

import { useLanguageContext } from "../../../contexts/language_context";
import { useInfoContext } from "../../../contexts/admin/info_context";

import { ListHead, ListLink, ListWrapper } from "../elements";

const ListLinks = () => {
  const { items, getLinks } = useInfoContext();

  const { translation } = useLanguageContext();
  const titles = ["ID", "link"];

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <ListWrapper>
      <h2>{translation.links.toUpperCase()}</h2>
      <ListHead colTitles={titles} />
      {items?.length > 0 &&
        items?.map((singleLink, index) => {
          return (
            <ListLink
              key={index}
              index={index}
              cols={2}
              url={`/admin/information/link/${singleLink.id}`}
            >
              <p>{singleLink.id.toUpperCase()}</p>
              {singleLink.link && <p>{singleLink.link.substring(0, 20)}...</p>}
            </ListLink>
          );
        })}
    </ListWrapper>
  );
};

export default ListLinks;
