import React from "react";
import { PageHero, Info } from "../components";
import { useLanguageContext } from "../contexts/language_context";

import mockInformation from "../mockData/mockInformation";

const OrderPage = () => {
  const { translation } = useLanguageContext();

  return (
    <main>
      <PageHero title={translation.orderHowTo} />
      <Info {...mockInformation[1]} />
    </main>
  );
};

export default OrderPage;
