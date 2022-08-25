import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Login from "../components/authentication/Login";
import { useAuthenticationContext } from "../contexts/authentication_context";
import { NewOrderModal } from "../components/admin/orders";
import { useLanguageContext } from "../contexts/language_context";

const AdminPage = () => {
  const { loggedIn, logout } = useAuthenticationContext();
  const { translation } = useLanguageContext();
  const navigate = useNavigate();

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
    return navigate("/admin/", { replace: true });
  }, []);

  useEffect(() => {
    if (newOrder) {
      setNewModalOpen(true);
    }
    return;
  }, [newOrder]);

  useEffect(() => {
    switch (category) {
      case "books":
        navigate("/admin/books/list", { replace: true });
        break;
      case "authors":
        navigate("/admin/authors/list", { replace: true });
        break;
      case "gifts":
        navigate("/admin/giftshop/list", { replace: true });
        break;
      case "ratings":
        navigate("/admin/ratingslist", { replace: true });
        break;
      case "news":
        navigate("/admin/news/list", { replace: true });
        break;
      case "info":
        navigate("/admin/orderslist", { replace: true });
        break;
      default:
        navigate("/admin", { replace: true });
        break;
    }
  }, [category]);

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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="books">{translation.books}</option>
              <option value="authors">{translation.authors}</option>
              <option value="gifts">giftshop</option>
              <option value="ratings">{translation.reviews}</option>
              <option value="news">{translation.news}</option>
              <option value="info">info</option>
            </select>

            {category === "books" && (
              <div className="nav-container">
                <Link className="nav-btn" to="/admin/books/add">
                  {translation.add}
                </Link>
                <Link className="nav-btn" to="/admin/books/list">
                  {translation.list}
                </Link>
              </div>
            )}

            {category === "authors" && (
              <div className="nav-container">
                <Link className="nav-btn" to="/admin/authors/list">
                  {translation.list}
                </Link>
              </div>
            )}

            {category === "gifts" && (
              <div className="nav-container">
                <Link className="nav-btn" to="/admin/giftshop/add">
                  {translation.add}
                </Link>
                <Link className="nav-btn" to="/admin/giftshop/list">
                  {translation.list}
                </Link>
              </div>
            )}

            {category === "ratings" && (
              <div className="nav-container">
                <Link className="nav-btn" to="/admin/addrating">
                  {translation.add}
                </Link>
                <Link className="nav-btn" to="/admin/ratingslist">
                  {translation.list}
                </Link>
              </div>
            )}

            {category === "news" && (
              <div className="nav-container">
                <Link className="nav-btn" to="/admin/news/add">
                  {translation.add}
                </Link>
                <Link className="nav-btn" to="/admin/news/list">
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
                <Link className="nav-btn" to="/admin/orderslist">
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
