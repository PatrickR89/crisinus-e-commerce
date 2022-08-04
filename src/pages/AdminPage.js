import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Login from "../components/authentication/Login";
import { useAuthenticationContext } from "../contexts/authentication_context";
import { NewOrderModal } from "../components/admin/orders";

const AdminPage = () => {
    const { loggedIn, logout } = useAuthenticationContext();
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
                            <option value="books">books</option>
                            <option value="authors">authors</option>
                            <option value="gifts">gifts</option>
                            <option value="ratings">ratings</option>
                            <option value="news">news</option>
                            <option value="info">info</option>
                        </select>

                        {category === "books" && (
                            <div className="nav-container">
                                <Link className="nav-btn" to="/admin/addbook">
                                    Add new
                                </Link>
                                <Link className="nav-btn" to="/admin/booklist">
                                    List
                                </Link>
                            </div>
                        )}

                        {category === "authors" && (
                            <div className="nav-container">
                                <Link
                                    className="nav-btn"
                                    to="/admin/authorslist"
                                >
                                    List
                                </Link>
                            </div>
                        )}

                        {category === "gifts" && (
                            <div className="nav-container">
                                <Link className="nav-btn" to="/admin/addgift">
                                    Add new
                                </Link>
                                <Link
                                    className="nav-btn"
                                    to="/admin/giftshoplist"
                                >
                                    List
                                </Link>
                            </div>
                        )}

                        {category === "ratings" && (
                            <div className="nav-container">
                                <Link className="nav-btn" to="/admin/addrating">
                                    Add new
                                </Link>
                                <Link
                                    className="nav-btn"
                                    to="/admin/ratingslist"
                                >
                                    List
                                </Link>
                            </div>
                        )}

                        {category === "news" && (
                            <div className="nav-container">
                                <Link className="nav-btn" to="/admin/addnews">
                                    Add new
                                </Link>
                                <Link className="nav-btn" to="/admin/newslist">
                                    List
                                </Link>
                            </div>
                        )}

                        {category === "info" && (
                            <div className="nav-container">
                                <Link className="nav-btn" to="/admin/infolist">
                                    Info pages
                                </Link>
                                <Link className="nav-btn" to="/admin/linkslist">
                                    Links
                                </Link>
                                <Link
                                    className="nav-btn"
                                    to="/admin/orderslist"
                                >
                                    Orders
                                </Link>
                                <Link className="nav-btn" to="/admin/messages">
                                    Messages
                                </Link>
                                <Link className="nav-btn" to="/admin/imagelist">
                                    Images
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
