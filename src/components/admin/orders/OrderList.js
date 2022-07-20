import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { useAuthenticationContext } from "../../../contexts/authentication_context";

const OrderList = () => {
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);
    const { header } = useAuthenticationContext();

    useEffect(() => {
        retrieveOrders();
    }, []);

    const retrieveOrders = () => {
        axios
            .get("/orders/", { headers: header() })
            .then((response) => {
                if (
                    response.data === "Token required" ||
                    response.data.auth === false
                )
                    return navigate("/admin/login", { replace: true });
                const data = response.data;
                setOrderList(data.reverse());
            })
            .catch((err) => {
                axios.post("/system/error", { err });
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
        <main>
            <Wrapper>
                ORDERS
                <div className="per-order head">
                    <section>ID</section>
                    <section>DATE</section>
                    <section>STATUS</section>
                </div>
                {orderList.length > 0 &&
                    orderList.map((order, index) => {
                        return (
                            <Link
                                key={index}
                                to={`/admin/orderlist/${order.id}`}
                            >
                                <div
                                    className={
                                        index % 2 === 0
                                            ? "itm-background-one per-order on-hover-list"
                                            : "itm-background-two per-order on-hover-list"
                                    }
                                >
                                    <p>{order.id}</p>

                                    <h4>{order.order_date}</h4>

                                    <div
                                        className={`status-color ${setStatusColor(
                                            order.order_status
                                        )}`}
                                    ></div>
                                </div>
                            </Link>
                        );
                    })}
            </Wrapper>
        </main>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    .head {
        margin-bottom: 2rem;
    }
    .per-order {
        display: inline-grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        text-align: center;
        width: 100%;
    }
`;

export default OrderList;
