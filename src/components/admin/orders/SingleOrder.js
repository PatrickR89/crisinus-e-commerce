import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";

import { useCurrencyContext } from "../../../contexts/currency_context";
import { useLanguageContext } from "../../../contexts/language_context";
import { useClientsContext } from "../../../contexts/admin/clients_context";
import WhenLoading from "../../public/WhenLoading";
import WhenError from "../../public/WhenError";

import { OrderModal } from "./";

const SingleOrder = () => {
  const { priceFormat } = useCurrencyContext();
  const { translation } = useLanguageContext();
  const {
    orderPage,
    findOrderById,
    setOrderStatus,
    setStatusColor,
    deleteOrderById,
    toggleModal,
    loading,
    error,
    clearError
  } = useClientsContext();
  const { order, cart, status, totalAmount, isModal } = orderPage;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const { id } = useParams();

  function deleteOrder() {
    deleteOrderById(id);
  }

  useEffect(() => {
    findOrderById(id);
  }, []);

  useEffect(() => {
    if (status === "NEW ORDER") {
      setOrderStatus(id, "CHECKED");
    }
  }, [status]);

  if (!order) {
    return <h2>Please wait</h2>;
  }

  if (loading) {
    return <WhenLoading />;
  }

  if (error) {
    return <WhenError handleError={clearError} />;
  }

  return (
    <Wrapper>
      <h3 className="order-title">
        {translation.orderNoun}:{" "}
        <span className={setStatusColor(status)}>{status}</span>
      </h3>
      <div className="order-main">
        <div className="left-side">
          <div className="client-info">
            <h4>{translation.clientInfo.toUpperCase()}</h4>
            <p>
              {translation.clientName.toUpperCase()}: {order.clientName}
            </p>
            <p>
              {translation.clientLastName.toUpperCase()}: {order.clientLastName}
            </p>
            <p>EMAIL: {order.clientEmail}</p>
            <p>
              {translation.clientStreetName.toUpperCase()}: {order.streetName}
            </p>
            <p>
              {translation.clientStreetNumber.toUpperCase()}:{" "}
              {order.streetNumber}
            </p>
            <p>
              {translation.clientCity.toUpperCase()}: {order.city}
            </p>
            <p>
              {translation.clientPostalCode.toUpperCase()}: {order.postalCode}
            </p>
          </div>
          <div className="button-container">
            <button className="btn" onClick={handlePrint}>
              PRINT
            </button>
            {status != "CONFIRMED" && (
              <button
                className="btn approve"
                onClick={() => setOrderStatus(id, "CONFIRMED")}
              >
                {translation.confirm}
              </button>
            )}
            {status === "CONFIRMED" && (
              <button className="btn btn-delete" onClick={toggleModal}>
                {translation.delete}
              </button>
            )}
          </div>
        </div>
        <div className="cart-info">
          <h4>{translation.cartInfo.toUpperCase}</h4>
          {cart?.map((cartItem, index) => {
            return (
              <div
                className={
                  index % 2 === 0
                    ? "itm-background-one per-item"
                    : "itm-background-two per-item"
                }
                key={index}
              >
                <div>
                  <p>
                    {translation.item.toUpperCase()}:{" "}
                    {cartItem.title || cartItem.name}
                  </p>
                  <p>
                    {translation.price.toUpperCase()}:{" "}
                    {priceFormat(cartItem.price)}
                  </p>
                </div>
                <div>
                  <p>
                    {translation.amount.toUpperCase()}: {cartItem.amount}
                  </p>
                  <p>
                    {translation.priceTotal.toUpperCase()}:{" "}
                    {priceFormat(cartItem.price * cartItem.amount)}
                  </p>
                </div>
              </div>
            );
          })}
          <h4>
            {translation.orderTotal.toUpperCase()}: {priceFormat(totalAmount)}
          </h4>
        </div>
      </div>
      <div style={{ display: "none" }}>
        <div className="order-main" ref={componentRef}>
          <div className="left-side">
            <h4 style={{ margin: "1rem" }}>
              {translation.clientInfo.toUpperCase()}
            </h4>
            <div style={{ margin: "2rem" }}>
              <p>
                {translation.name.toUpperCase()}: {order.clientName}
              </p>
              <p>
                {translation.clientLastName.toUpperCase()}:{" "}
                {order.clientLastName}
              </p>
              <p>EMAIL: {order.clientEmail}</p>
              <p>
                {translation.clientStreetName.toUpperCase()}: {order.streetName}
              </p>
              <p>
                {translation.clientStreetNumber.toUpperCase()}:{" "}
                {order.streetNumber}
              </p>
              <p>
                {" "}
                {translation.clientCity.toUpperCase()}: {order.city}
              </p>
              <p>
                {translation.clientPostalCode.toUpperCase()}: {order.postalCode}
              </p>
            </div>
          </div>
          <div className="cart-info">
            <h4 style={{ margin: "1rem" }}>
              {translation.cartInfo.toUpperCase}
            </h4>
            {cart?.map((cartItem, index) => {
              return (
                <div key={index} style={{ margin: "2rem" }}>
                  <div>
                    <p>
                      {translation.item.toUpperCase()}:{" "}
                      {cartItem.title || cartItem.name}
                    </p>
                    <p>
                      {translation.price.toUpperCase()}:{" "}
                      {priceFormat(cartItem.price)}
                    </p>
                  </div>
                  <div>
                    <p>
                      {" "}
                      {translation.amount.toUpperCase()}: {cartItem.amount}
                    </p>
                    <p>
                      {translation.priceTotal.toUpperCase()}:{" "}
                      {priceFormat(cartItem.price * cartItem.amount)}
                    </p>
                  </div>
                  <hr />
                </div>
              );
            })}
            <h4 style={{ margin: "1rem" }}>
              {translation.orderTotal.toUpperCase()}: {priceFormat(totalAmount)}
            </h4>
          </div>
        </div>
      </div>
      {isModal && (
        <OrderModal closeModal={toggleModal} deleteOrder={deleteOrder} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-bottom: 2px dashed var(--clr-button-3);
  .order-title {
    font-size: 2rem;
    margin: 1rem;
    border-bottom: 2px dashed var(--clr-button-3);
  }
  .order-main {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;
  }
  .left-side {
    width: 30%;
    button {
      margin: 0.5rem;
    }
    .approve {
      background-color: var(--clr-green-dark);
    }
  }
  .client-info {
    text-align: left;
    border-left: 5px solid var(--clr-button-2);
    padding: 1rem 1rem 0.5rem 0.5rem;
    font-weight: bold;
    background-color: var(--clr-button-5);
    h4 {
      margin-bottom: 2rem;
      font-size: 1.3rem;
    }
    p {
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--clr-primary-6);
    }
  }
  .cart-info {
    text-align: left;
    max-width: 65%;
    margin-bottom: 2rem;
    font-weight: bold;
    background-color: var(--clr-button-5);
    h4 {
      font-size: 1.3rem;
      border-left: 5px solid var(--clr-button-2);
      padding: 1rem 1rem 0.5rem 0.5rem;
    }
  }

  .per-item {
    display: inline-grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    padding: 1rem 1rem 0.5rem 0.5rem;
    p {
      margin: 0.5rem 1rem 0.5rem 0.5rem;
      border-bottom: 1px solid var(--clr-primary-6);
    }
  }

  .itm-background-one {
    background: var(--clr-primary-8);
    border-left: 5px solid var(--clr-primary-4);
  }
  .itm-background-two {
    background: var(--clr-button-6);
    border-left: 5px solid var(--clr-button-3);
  }
`;

export default SingleOrder;
