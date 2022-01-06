import React from "react";
import { PageHero, Info } from "../components";
import mockInformation from "../mockData/mockInformation";
import { useLanguageContext } from "../contexts/language_context";

const AboutUsPage = () => {
  const { translation } = useLanguageContext();

  return (
    <main>
      <PageHero title={translation.aboutUs} />
      <Info {...mockInformation[0]} />
    </main>
  );
};

export default AboutUsPage;
