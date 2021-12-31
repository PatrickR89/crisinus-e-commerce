import React from "react";
import { PageHero, Info } from "../components";
import mockInformation from "../mockData/mockInformation";

const AboutUsPage = () => {
  return (
    <main>
      <PageHero title="AboutUs" />
      <Info {...mockInformation[0]} />
    </main>
  );
};

export default AboutUsPage;
