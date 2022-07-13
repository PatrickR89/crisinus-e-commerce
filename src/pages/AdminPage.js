import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import Login from "../components/authentication/Login";

import { useAuthenticationContext } from "../contexts/authentication_context";

const AdminPage = () => {
    const { loggedIn, logout } = useAuthenticationContext();

    const [category, setCategory] = useState("books");

    if (!loggedIn) {
        return <Login />;
    }
    if (loggedIn) {
        return (
            <main>
                <Wrapper>
                    <div className="nav-container">
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
                                    Add new book
                                </Link>
                                <Link className="nav-btn" to="/admin/booklist">
                                    List of books
                                </Link>
                            </div>
                        )}

                        {category === "authors" && (
                            <div className="nav-container">
                                <Link
                                    className="nav-btn"
                                    to="/admin/authorslist"
                                >
                                    List of authors
                                </Link>
                            </div>
                        )}

                        {category === "gifts" && (
                            <div className="nav-container">
                                <Link className="nav-btn" to="/admin/addgift">
                                    Add new item to Giftshop
                                </Link>
                                <Link
                                    className="nav-btn"
                                    to="/admin/giftshoplist"
                                >
                                    Giftshop List
                                </Link>
                            </div>
                        )}

                        {category === "ratings" && (
                            <div className="nav-container">
                                <Link className="nav-btn" to="/admin/addrating">
                                    Add a new rating
                                </Link>
                                <Link
                                    className="nav-btn"
                                    to="/admin/ratingslist"
                                >
                                    Ratings List
                                </Link>
                            </div>
                        )}

                        {category === "news" && (
                            <div className="nav-container">
                                <Link className="nav-btn" to="/admin/addnews">
                                    Add news
                                </Link>
                                <Link className="nav-btn" to="/admin/newslist">
                                    News List
                                </Link>
                            </div>
                        )}

                        {category === "info" && (
                            <div className="nav-container">
                                <Link className="nav-btn" to="/admin/infolist">
                                    List info pages
                                </Link>
                                <Link className="nav-btn" to="/admin/linkslist">
                                    List links
                                </Link>
                                <Link
                                    className="nav-btn"
                                    to="/admin/orderslist"
                                >
                                    List orders
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
        background-color: var(--clr-button-3);
    }
    .mg-1 {
        margin: 1rem;
    }
`;

export default AdminPage;
