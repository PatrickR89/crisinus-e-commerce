import React from "react";
import { PageHero, Info } from "../components";
import { useLanguageContext } from "../contexts/language_context";

import mockInformation from "../mockData/mockInformation";

const PaymentPage = () => {
  const { translation } = useLanguageContext();

  return (
    <main>
      <PageHero title={translation.paymentAndShipping} />
      <Info {...mockInformation[3]} />
    </main>
  );
};

export default PaymentPage;
