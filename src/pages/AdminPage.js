import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Login from "../components/authentication/Login";
import { useAuthenticationContext } from "../contexts/authentication_context";
import { NewOrderModal } from "../components/admin/orders";
import { useLanguageContext } from "../contexts/language_context";

const AdminPage = () => {
    const { loggedIn, logout } = useAuthenticationContext();
    const { translation } = useLanguageContext();

    const [newOrder, setNewOrder] = useState(false);
    const [newModalOpen, setNewModalOpen] = useState(false);

    const [category, setCategory] = useState("books");

    const statusReport = async () => {
        try {
            await axios.get("/api/orders/status").then((response) => {
                const data = response.data;
                setNewOrder(data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const closeModal = () => {
        setNewModalOpen(false);
    };

    useEffect(() => {
        statusReport();
    }, []);

    useEffect(() => {
        if (newOrder) {
            setNewModalOpen(true);
        }
        return;
    }, [newOrder]);

    if (!loggedIn) {
        return <Login />;
    }
    if (loggedIn) {
        return (
            <main>
                <Wrapper>
                    <div className="nav-container normal-backgrnd">
                        <select
                            name="editorial"
                            id="editorial"
                            className="nav-btn"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="books">{translation.books}</option>
                            <option value="authors">
                                {translation.authors}
                            </option>
                            <option value="gifts">giftshop</option>
                            <option value="ratings">
                                {translation.reviews}
                            </option>
                            <option value="news">{translation.news}</option>
                            <option value="info">info</option>
                        </select>

                        {category === "books" && (
                            <div className="nav-container">
                                <Link className="nav-btn" to="/admin/addbook">
                                    {translation.add}
                                </Link>
                                <Link className="nav-btn" to="/admin/booklist">
                                    {translation.list}
                                </Link>
                            </div>
                        )}

                        {category === "authors" && (
                            <div className="nav-container">
                                <Link
                                    className="nav-btn"
                                    to="/admin/authorslist"
                                >
                                    {translation.list}
                                </Link>
                            </div>
                        )}

                        {category === "gifts" && (
                            <div className="nav-container">
                                <Link className="nav-btn" to="/admin/addgift">
                                    {translation.add}
                                </Link>
                                <Link
                                    className="nav-btn"
                                    to="/admin/giftshoplist"
                                >
                                    {translation.list}
                                </Link>
                            </div>
                        )}

                        {category === "ratings" && (
                            <div className="nav-container">
                                <Link className="nav-btn" to="/admin/addrating">
                                    {translation.add}
                                </Link>
                                <Link
                                    className="nav-btn"
                                    to="/admin/ratingslist"
                                >
                                    {translation.list}
                                </Link>
                            </div>
                        )}

                        {category === "news" && (
                            <div className="nav-container">
                                <Link className="nav-btn" to="/admin/addnews">
                                    {translation.add}
                                </Link>
                                <Link className="nav-btn" to="/admin/newslist">
                                    {translation.list}
                                </Link>
                            </div>
                        )}

                        {category === "info" && (
                            <div className="nav-container">
                                <Link className="nav-btn" to="/admin/infolist">
                                    {translation.infoPages}
                                </Link>
                                <Link className="nav-btn" to="/admin/linkslist">
                                    {translation.links}
                                </Link>
                                <Link
                                    className="nav-btn"
                                    to="/admin/orderslist"
                                >
                                    {translation.orders}
                                </Link>
                                <Link className="nav-btn" to="/admin/messages">
                                    {translation.messages}
                                </Link>
                                <Link className="nav-btn" to="/admin/imagelist">
                                    {translation.images}
                                </Link>
                            </div>
                        )}

                        <button className="nav-btn" onClick={logout}>
                            Logout
                        </button>
                    </div>
                    <Outlet />
                    {loggedIn && newModalOpen && (
                        <NewOrderModal closeModal={closeModal} />
                    )}
                </Wrapper>
            </main>
        );
    }
};

const Wrapper = styled.div`
    margin-top: 2rem;
    select {
        option {
            font-size: 1rem;
            font-weight: bold;
            text-transform: uppercase;
        }
    }
    .nav-container {
        justify-content: flex-end;
    }
    .mg-1 {
        margin: 1rem;
    }

    .normal-backgrnd {
        background-color: var(--clr-button-3);
    }
`;

export default AdminPage;
