import React from "react";
import { PageHero, Info } from "../components";

import mockInformation from "../mockData/mockInformation";

const DisclaimerPage = () => {
  return (
    <main>
      <PageHero title="Disclaimer" />
      <Info {...mockInformation[4]} />
    </main>
  );
};

export default DisclaimerPage;
