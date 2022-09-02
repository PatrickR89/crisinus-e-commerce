import React, { useEffect } from "react";

import { useLanguageContext } from "../../../contexts/language_context";
import { useClientsContext } from "../../../contexts/admin/clients_context";
import { ListHead, ListLink, ListWrapper } from "../elements";
import WhenLoading from "../../public/WhenLoading";
import WhenError from "../../public/WhenError";

const OrderList = () => {
  const { translation } = useLanguageContext();
  const {
    orderPage,
    findAllOrders,
    setStatusColor,
    loading,
    error,
    clearError
  } = useClientsContext();
  const { orderList } = orderPage;
  const titles = ["id", translation.date, "status"];

  useEffect(() => {
    findAllOrders();
  }, []);

  if (loading) {
    return <WhenLoading />;
  }

  if (error) {
    return <WhenError handleError={clearError} />;
  }

  return (
    <ListWrapper>
      <h2>{translation.orders.toUpperCase()}</h2>
      <ListHead colTitles={titles} />
      {orderList.length > 0 &&
        orderList.map((order, index) => {
          return (
            <ListLink
              key={index}
              index={index}
              cols={3}
              url={`/admin/clients/orders/${order.id}`}
            >
              <p>{order.id}</p>

              <h4>{order.order_date}</h4>

              <div
                className={`status-color ${setStatusColor(order.order_status)}`}
              ></div>
            </ListLink>
          );
        })}
    </ListWrapper>
  );
};

export default OrderList;
