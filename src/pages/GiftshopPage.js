import React from "react";

import styled from "styled-components";

import { useItemsContext } from "../contexts/items_context";

import { PageHero, ItemsList } from "../components";

import { Gift } from "../components";

const GiftshopPage = () => {
  const {
    gifts: allGifts,
    items_loading: loading,
    items_error: error
  } = useItemsContext();

  if (loading) {
    return (
      <div className="loading">
        <h1>Please wait...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading">
        <h1>Unfortunately an error occured</h1>
      </div>
    );
  }

  return (
    <main>
      <PageHero title="giftshop" />
      <Wrapper>
        <ItemsList
          initialItems={allGifts}
          SingleItem={Gift}
          pageItems={12}
          url="/giftshop/"
        />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div``;

export default GiftshopPage;
