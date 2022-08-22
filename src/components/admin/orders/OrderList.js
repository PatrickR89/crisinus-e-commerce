import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useLanguageContext } from "../../../contexts/language_context";
import { ListHead, ListLink, ListWrapper } from "../elements";

const OrderList = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const { header } = useAuthenticationContext();
  const { translation } = useLanguageContext();
  const titles = ["id", translation.date, "status"];
  useEffect(() => {
    retrieveOrders();
  }, []);

  const retrieveOrders = () => {
    axios
      .get("/api/orders/", { headers: header() })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        const data = response.data;
        setOrderList(data.reverse());
      })
      .catch((error) => {
        const err = `api: /api/orders [orderlist[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const setStatusColor = (orderStatus) => {
    if (orderStatus === "NEW ORDER") {
      return "red-background";
    } else if (orderStatus === "CHECKED") {
      return "yellow-background";
    } else if (orderStatus === "CONFIRMED") {
      return "green-background";
    }
  };

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
              url={`/admin/orderlist/${order.id}`}
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
