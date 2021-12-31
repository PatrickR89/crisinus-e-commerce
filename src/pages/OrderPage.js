import React from "react";
import { PageHero, Info } from "../components";

import mockInformation from "../mockData/mockInformation";

const OrderPage = () => {
  return (
    <main>
      <PageHero title="order" />
      <Info {...mockInformation[1]} />
    </main>
  );
};

export default OrderPage;
