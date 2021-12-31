import React from "react";
import { PageHero, Info } from "../components";
import mockInformation from "../mockData/mockInformation";

const InfoPage = () => {
  return (
    <main>
      <PageHero title="Info" />
      <Info {...mockInformation[2]} />
    </main>
  );
};

export default InfoPage;
