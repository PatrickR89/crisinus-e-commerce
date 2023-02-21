import React, { useEffect } from "react";

import { useLanguageContext } from "../../../contexts/language_context";
import { useInfoContext } from "../../../contexts/admin/info_context";

import { ListHead, ListLink, ListWrapper } from "../elements";
import WhenLoading from "../../public/WhenLoading";
import WhenError from "../../public/WhenError";

const ListLinks = () => {
  const { items, getLinks, loading, error, clearError } = useInfoContext();

  const { translation } = useLanguageContext();
  const titles = ["ID", "link"];

  useEffect(() => {
    getLinks();
  }, []);

  if (loading) {
    return <WhenLoading />;
  }

  if (error) {
    return <WhenError handleError={clearError} />;
  }

  return (
    <ListWrapper>
      <h2>{translation.links.toUpperCase()}</h2>
      <ListHead colTitles={titles} />
      {Array.isArray(items) &&
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
