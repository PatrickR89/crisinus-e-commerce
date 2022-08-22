import React, { useState, useEffect } from "react";
import axios from "axios";

import { useLanguageContext } from "../../../contexts/language_context";

import { ListHead, ListLink, ListWrapper } from "../elements";

const GiftshopList = () => {
  const { translation } = useLanguageContext();
  const { name, price, maxOrder, description } = translation;
  const titles = ["ID", name, price, maxOrder, description];
  const [gsList, setGsList] = useState([]);

  const getGifts = () => {
    axios
      .get("/api/giftshop/")
      .then((response) => {
        setGsList(response.data);
      })
      .catch((error) => {
        const err = `api: /api/giftshop/} [giftslist[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  useEffect(() => {
    getGifts();
  }, []);

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
              url={`/admin/editgift/${gift.id}`}
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
