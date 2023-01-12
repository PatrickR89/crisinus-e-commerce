import React, { useState, useEffect } from "react";

import { useLanguageContext } from "../../../contexts/language_context";
import { useGiftshopContext } from "../../../contexts/admin/giftshop_context";

import { ListHead, ListLink, ListWrapper } from "../elements";
import WhenLoading from "../../public/WhenLoading";
import WhenError from "../../public/WhenError";
import DimensionModal from "../elements/DimensionModal";
import formatPrice from "../../../utils/formatPrice";

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

  const [isModal, setIsModal] = useState(false);
  const [itemForModal, setItemForModal] = useState({ id: "", name: "" });

  function closeModal() {
    setIsModal(false);
  }
  function openModal(id, title) {
    setItemForModal({ id: id, name: title });
    setIsModal(true);
  }

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
    <>
      <ListWrapper>
        <h2>{translation.giftshopList.toUpperCase()}</h2>
        <ListHead colTitles={titles} btn="1" />
        {gsList.length > 0 &&
          gsList.map((gift, index) => {
            return (
              <div className="item-row" key={gift.id}>
                <ListLink
                  key={index}
                  index={index}
                  cols={5}
                  url={`/admin/giftshop/${gift.id}`}
                >
                  <p>{gift.id}</p>

                  <h4>{gift.name}</h4>

                  <p>{formatPrice(gift.price)}</p>
                  <p>{gift.max_order}</p>
                  {gift.description && (
                    <p>{gift.description.substring(0, 25)}...</p>
                  )}
                </ListLink>
                <button
                  className="btn"
                  onClick={() => openModal(gift.id, gift.name)}
                >
                  Dim
                </button>
              </div>
            );
          })}
      </ListWrapper>
      {isModal && (
        <DimensionModal closeModal={closeModal} item={itemForModal} />
      )}
    </>
  );
};

export default GiftshopList;
