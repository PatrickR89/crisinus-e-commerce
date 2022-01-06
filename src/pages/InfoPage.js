import React from "react";
import { PageHero, Info } from "../components";
import { useLanguageContext } from "../contexts/language_context";

import mockInformation from "../mockData/mockInformation";

const InfoPage = () => {
  const { translation } = useLanguageContext();

  return (
    <main>
      <PageHero title={translation.genInfo} />
      <Info {...mockInformation[2]} />
    </main>
  );
};

export default InfoPage;
