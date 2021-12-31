import React from "react";
import { PageHero, Info } from "../components";

import mockInformation from "../mockData/mockInformation";

const PaymentPage = () => {
  return (
    <main>
      <PageHero title="payment-and-shipping" />
      <Info {...mockInformation[3]} />
    </main>
  );
};

export default PaymentPage;
