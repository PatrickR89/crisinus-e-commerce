import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { SingleMessageModal } from "./";
import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useLanguageContext } from "../../../contexts/language_context";

const MessageList = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    id: 0,
    name: "",
    email: "",
    date: "",
    status: "",
    message: ""
  });
  const [isModal, setIsModal] = useState(false);
  const { header } = useAuthenticationContext();
  const { translation } = useLanguageContext();

  useEffect(() => {
    retrieveMsgs();
  }, []);

  const retrieveMsgs = () => {
    axios
      .get("/api/messages/", { headers: header() })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        const data = response.data;
        setMessages(data.reverse());
      })
      .catch((error) => {
        const err = `api: /api/orders [orderlist[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const handleFetchMessage = (id) => {
    axios
      .get(`/api/messages/${id}`, { headers: header() })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
        setMessage(response.data);
      })
      .catch((error) => {
        const err = `api: /api/orders [orderlist[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const handleMessage = (id, status) => {
    handleFetchMessage(id);
    if (status == "NEW") {
      handleConfirm("CHECKED", id);
    }
    setIsModal(true);
  };

  const handleConfirm = async (status, id) => {
    await axios
      .put(`/api/messages/${id}`, {
        headers: header(),
        status
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
      })
      .catch((error) => {
        const err = `api: /api/orders/${id} [singleorder[PUT]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`/api/messages/${id}`, {
        headers: header(),
        data: { id: id }
      })
      .then((response) => {
        if (response.data === "Token required" || response.data.auth === false)
          return navigate("/admin/login", { replace: true });
      })
      .catch((error) => {
        const err = `api: /api/orders/${id} [singleorder[DELETE]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const closeModal = () => {
    setMessage({
      id: 0,
      name: "",
      email: "",
      date: "",
      status: "",
      message: ""
    });
    setIsModal(false);
    retrieveMsgs();
  };

  const setStatusColor = (msgStatus) => {
    if (msgStatus === "NEW") {
      return "red-background";
    } else if (msgStatus === "CHECKED") {
      return "yellow-background";
    } else if (msgStatus === "CONFIRMED") {
      return "green-background";
    }
  };

  return (
    <main>
      <Wrapper>
        <h2>{translation.messages.toUpperCase()}</h2>
        <div className="per-order head">
          <section>ID</section>
          <section>{translation.name.toUpperCase()}</section>
          <section>EMAIL</section>
          <section>{translation.date.toUpperCase()}</section>
          <section>STATUS</section>
        </div>
        {messages.length > 0 &&
          messages.map((message, index) => {
            return (
              <button key={index}>
                <div
                  className={
                    index % 2 === 0
                      ? "itm-background-one per-order on-hover-list"
                      : "itm-background-two per-order on-hover-list"
                  }
                  onClick={() => {
                    handleMessage(message.id, message.status);
                  }}
                >
                  <p>{message.id}</p>

                  <h4>{message.name}</h4>
                  <h4>{message.email}</h4>
                  <p>{message.date}</p>

                  <div
                    className={`status-color ${setStatusColor(message.status)}`}
                  ></div>
                </div>
              </button>
            );
          })}
        {isModal && (
          <SingleMessageModal
            message={message}
            handleClose={closeModal}
            handleConfirm={handleConfirm}
            handleDelete={handleDelete}
          />
        )}
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
  button {
    font-family: inherit;
    border: none;
  }
  .per-order {
    display: inline-grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    text-align: center;
    width: 100%;
  }
`;

export default MessageList;
