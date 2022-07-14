import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { useAuthenticationContext } from "../../../contexts/authentication_context";

const SingleOrder = () => {
    const [order, setOrder] = useState({});
    const [cart, setCart] = useState([]);
    const [status, setStatus] = useState();
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
            });
    };

    useEffect(() => {
        getOrder();
    }, []);

    return <div>SingleOrder</div>;
};

export default SingleOrder;
