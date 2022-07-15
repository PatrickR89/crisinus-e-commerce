import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useCurrencyContext } from "../../../contexts/currency_context";
import { OrderModal } from "./";

const SingleOrder = () => {
    const { priceFormat } = useCurrencyContext();

    const [order, setOrder] = useState({});
    const [cart, setCart] = useState([]);
    const [status, setStatus] = useState();
    const [modalStatus, setModalStatus] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const { id } = useParams();
    const { header } = useAuthenticationContext();
    const navigate = useNavigate();

    const getOrder = async () => {
        await axios
            .post(`/orders/${id}`, {
                headers: header(),
                id
            })
            .then((response) => {
                if (
                    response.data === "Token required" ||
                    response.data.auth === false
                )
                    return navigate("/admin/login", { replace: true });

                const data = response.data[0];
                const parsedOrder = JSON.parse(data.product_order);
                setOrder(parsedOrder.cartOrder);
                setCart(parsedOrder.cart);
                setStatus(data.order_status);
                console.log(data.order_status);
                setTotalAmount(parsedOrder.totalAmount);
            });
    };

    const closeModal = () => {
        setModalStatus(false);
    };

    const setOrderStatus = async (status) => {
        setStatus(status);
        await axios
            .put(`/orders/${id}`, {
                headers: header(),
                id,
                status
            })
            .then((response) => {
                if (
                    response.data === "Token required" ||
                    response.data.auth === false
                )
                    return navigate("/admin/login", { replace: true });
            });
    };

    const deleteOrder = async () => {
        await axios
            .delete(`/orders/${id}`, {
                headers: header(),
                data: { id: id }
            })
            .then((response) => {
                if (
                    response.data === "Token required" ||
                    response.data.auth === false
                )
                    return navigate("/admin/login", { replace: true });
            });
    };

    useEffect(() => {
        getOrder();
    }, []);

    useEffect(() => {
        if (status === "NEW ORDER") {
            setOrderStatus("CHECKED");
        }
    }, [status]);

    const setStatusColor = (orderStatus) => {
        if (orderStatus === "NEW ORDER") {
            return "red-background";
        } else if (orderStatus === "CHECKED") {
            return "yellow-background";
        } else if (orderStatus === "CONFIRMED") {
            return "green-background";
        }
    };

    if (!order) {
        return <h2>Please wait</h2>;
    }

    return (
        <Wrapper>
            <h3 className="order-title">
                ORDER: <span className={setStatusColor(status)}>{status}</span>
            </h3>
            <div className="order-main">
                <div className="left-side">
                    <div className="client-info">
                        <h4>CLIENT INFORMATION</h4>
                        <p>NAME: {order.clientName}</p>
                        <p>LAST NAME: {order.clientLastName}</p>
                        <p>EMAIL: {order.clientEmail}</p>
                        <p>STREET: {order.streetName}</p>
                        <p>STREET NO.: {order.streetNumber}</p>
                        <p>CITY: {order.city}</p>
                        <p>POSTAL CODE: {order.postalCode}</p>
                    </div>
                    <div className="button-container">
                        {status != "CONFIRMED" && (
                            <button
                                className="btn approve"
                                onClick={() => setOrderStatus("CONFIRMED")}
                            >
                                CONFIRM
                            </button>
                        )}
                        {status === "CONFIRMED" && (
                            <button
                                className="btn btn-delete"
                                onClick={() => setModalStatus(true)}
                            >
                                DELETE ORDER
                            </button>
                        )}
                    </div>
                </div>
                <div className="cart-info">
                    <h4>CART INFORMATION</h4>
                    {cart.map((cartItem, index) => {
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
                                        ITEM: {cartItem.title || cartItem.name}
                                    </p>
                                    <p>PRICE: {priceFormat(cartItem.price)}</p>
                                </div>
                                <div>
                                    <p>AMOUNT: {cartItem.amount}</p>
                                    <p>
                                        PRICE TOTAL:{" "}
                                        {priceFormat(
                                            cartItem.price * cartItem.amount
                                        )}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <h4>ORDER TOTAL: {priceFormat(totalAmount)}</h4>
                </div>
            </div>
            {modalStatus && (
                <OrderModal closeModal={closeModal} deleteOrder={deleteOrder} />
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
