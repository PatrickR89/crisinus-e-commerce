import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { PageHero } from "../components";
import { useLanguageContext } from "../contexts/language_context";
import { useItemsContext } from "../contexts/items_context";

const NewsExpandedPage = () => {
  const { id } = useParams();

  const { translation } = useLanguageContext();
  const { fetchSingleNews } = useItemsContext();

  useEffect(() => {
    const idInt = parseInt(id);
    fetchSingleNews(idInt);
  }, [id]);

  return (
    <main>
      <PageHero title={id} adress={translation.news} />
      newsExpandedPage
      {id}
    </main>
  );
};

export default NewsExpandedPage;
