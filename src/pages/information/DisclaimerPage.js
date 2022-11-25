import React, { useEffect } from "react";
import { Info } from "../../components/public/info";
import { PageHero } from "../../components/public/elements";
import { useLanguageContext } from "../../contexts/language_context";
import { useItemsContext } from "../../contexts/items_context";
import WhenLoading from "../../components/public/WhenLoading";

const DisclaimerPage = () => {
  const { translation } = useLanguageContext();
  const { current_info, fetchInfo, single_item_loading } = useItemsContext();

  useEffect(() => {
    fetchInfo("disclaimer");
  }, []);

  if (single_item_loading) {
    return <WhenLoading />;
  }

  return (
    <main>
      <PageHero title={translation.disclaimer} />
      <Info {...current_info} title={translation.disclaimer} />
    </main>
  );
};

export default DisclaimerPage;
