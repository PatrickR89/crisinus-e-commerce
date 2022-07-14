import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { useAuthenticationContext } from "../../../contexts/authentication_context";

const OrderList = () => {
    const [orderList, setOrderList] = useState([]);

    const { header, loggedIn } = useAuthenticationContext();

    useEffect(() => {
        retrieveOrders();
    }, []);

    const retrieveOrders = async () => {
        try {
            const response = await axios.get("/orders/", { headers: header() });
            const data = await response.data;
            setOrderList(data);
        } catch (error) {
            console.log(error);
        }
    };

    const setStatusColor = (orderStatus) => {
        if (orderStatus === "NEW ORDER") {
            return "red-background";
        } else if (orderStatus === "READ") {
            return "yellow-background";
        } else if (orderStatus === "APPROVED") {
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
                            <Link to={`/admin/editauthor/`}>
                                <div
                                    key={index}
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
    .status-color {
        width: 50px;
        height: 15px;
        margin: auto;
    }

    .red-background {
        background-color: var(--clr-red-dark);
    }
    .yellow-background {
        background-color: var(--clr-yellow);
    }
    .green-background {
        background-color: var(--clr-green-dark);
    }
`;

export default OrderList;
