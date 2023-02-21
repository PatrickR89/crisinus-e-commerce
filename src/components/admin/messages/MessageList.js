import React, { useEffect } from "react";

import { SingleMessageModal } from "./";
import { useLanguageContext } from "../../../contexts/language_context";
import { useClientsContext } from "../../../contexts/admin/clients_context";

import { ListHead, ListLink, ListWrapper } from "../elements";
import WhenLoading from "../../public/WhenLoading";
import WhenError from "../../public/WhenError";

const MessageList = () => {
  const {
    messages,
    message,
    isModal,
    findAllMsgs,
    handleConfirm,
    handleMessage,
    closeModal,
    deleteMsgById,
    setStatusColor,
    loading,
    error,
    clearError
  } = useClientsContext();
  const { translation } = useLanguageContext();

  useEffect(() => {
    findAllMsgs();
  }, []);

  if (loading) {
    return <WhenLoading />;
  }

  if (error) {
    return <WhenError handleError={clearError} />;
  }

  const titles = ["ID", translation.name, "EMAIL", translation.date, "STATUS"];

  return (
    <ListWrapper>
      <h2>{translation.messages.toUpperCase()}</h2>
      <ListHead colTitles={titles} />
      {Array.isArray(messages) &&
        messages.map((message, index) => {
          return (
            <ListLink
              key={index}
              index={index}
              cols={5}
              modal={true}
              handleClick={() => {
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
            </ListLink>
          );
        })}
      {isModal && (
        <SingleMessageModal
          message={message}
          handleClose={closeModal}
          handleConfirm={handleConfirm}
          handleDelete={deleteMsgById}
        />
      )}
    </ListWrapper>
  );
};

export default MessageList;
