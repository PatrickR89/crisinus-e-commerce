import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useCurrencyContext } from "../../../contexts/currency_context";

const SingleOrder = () => {
    const { priceFormat } = useCurrencyContext();

    const [order, setOrder] = useState({});
    const [cart, setCart] = useState([]);
    const [status, setStatus] = useState();
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

    useEffect(() => {
        getOrder();
    }, []);

    if (!order) {
        return <h2>Please wait</h2>;
    }

    return (
        <Wrapper>
            <h4>{status}</h4>
            <div className="order-main">
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
                <div className="cart-info">
                    <h4>CART INFORMATION</h4>
                    {cart.map((cartItem, index) => {
                        return (
                            <div className="by-order" key={index}>
                                <p>ITEM: {cartItem.title || cartItem.name}</p>
                                <p>PRICE: {priceFormat(cartItem.price)}</p>

                                <p>AMOUNT: {cartItem.amount}</p>
                                <p>
                                    PRICE TOTAL:{" "}
                                    {priceFormat(
                                        cartItem.price * cartItem.amount
                                    )}
                                </p>
                            </div>
                        );
                    })}
                    <p>ORDER TOTAL: {priceFormat(totalAmount)}</p>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .order-main {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-evenly;
    }
`;

export default SingleOrder;
