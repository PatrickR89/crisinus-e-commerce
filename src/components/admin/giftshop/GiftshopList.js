import React, { useState, useEffect } from "react";
import axios from "axios";

import { useLanguageContext } from "../../../contexts/language_context";
import { useGiftshopContext } from "../../../contexts/admin/giftshop_context";

import { ListHead, ListLink, ListWrapper } from "../elements";
import WhenLoading from "../../public/WhenLoading";
import WhenError from "../../public/WhenError";

const GiftshopList = () => {
  const { translation } = useLanguageContext();
  const {
    gifts: gsList,
    getGifts,
    loading,
    error,
    clearError
  } = useGiftshopContext();
  const { name, price, maxOrder, description } = translation;
  const titles = ["ID", name, price, maxOrder, description];

  useEffect(() => {
    getGifts();
  }, []);

  if (loading) {
    return <WhenLoading />;
  }

  if (error) {
    return <WhenError handleError={clearError} />;
  }

  return (
    <ListWrapper>
      <h2>{translation.giftshopList.toUpperCase()}</h2>
      <ListHead colTitles={titles} />
      {gsList.length > 0 &&
        gsList.map((gift, index) => {
          return (
            <ListLink
              key={index}
              index={index}
              cols={5}
              url={`/admin/giftshop/${gift.id}`}
            >
              <p>{gift.id}</p>

              <h4>{gift.name}</h4>

              <p>{gift.price}</p>
              <p>{gift.max_order}</p>
              {gift.description && (
                <p>{gift.description.substring(0, 25)}...</p>
              )}
            </ListLink>
          );
        })}
    </ListWrapper>
  );
};

export default GiftshopList;
