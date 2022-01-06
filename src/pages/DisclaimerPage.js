import React from "react";
import { PageHero, Info } from "../components";
import { useLanguageContext } from "../contexts/language_context";

import mockInformation from "../mockData/mockInformation";

const DisclaimerPage = () => {
  const { translation } = useLanguageContext();

  return (
    <main>
      <PageHero title={translation.disclaimer} />
      <Info {...mockInformation[4]} />
    </main>
  );
};

export default DisclaimerPage;
