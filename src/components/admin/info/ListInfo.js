import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useLanguageContext } from "../../../contexts/language_context";

import ListLink from "../elements/ListLink";
import ListHead from "../elements/ListHead";

const ListInfo = () => {
  const navigate = useNavigate();

  const { header } = useAuthenticationContext();
  const { translation } = useLanguageContext();
  const { title, titleShow, content } = translation;
  const titles = ["ID", title, titleShow, content];
  const [infoList, setInfoList] = useState([]);

  const getInfoPages = () => {
    axios
      .get("/api/infopages/")
      .then((response) => {
        setInfoList(response.data);
      })
      .catch((error) => {
        const err = `api: /api/infopages/ [infolist[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  const resetTable = () => {
    axios
      .post("/api/infopages/reset", { headers: header() })
      .then((response) => {
        console.log(response);
        if (
          response.data === "Token required" ||
          response.data.auth === false
        ) {
          return navigate("/admin/login", { replace: true });
        } else {
          setInfoList(response.data);
        }
      })
      .catch((error) => {
        const err = `api: /api/infopages/reset [infolist[POST]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  useEffect(() => {
    getInfoPages();
  }, []);

  return (
    <Wrapper>
      <h2>{translation.infoPages.toUpperCase()}</h2>
      <ListHead colTitles={titles} />
      {infoList.length > 0 &&
        infoList.map((infoPage, index) => {
          return (
            <ListLink
              key={index}
              index={index}
              cols={4}
              url={`/admin/editinfo/${infoPage.id}`}
            >
              <p>{infoPage.id}</p>

              <p>{infoPage.title}</p>
              <h4>{infoPage.show_title}</h4>

              {infoPage.content && (
                <p>{infoPage.content.substring(0, 15)}...</p>
              )}
            </ListLink>
          );
        })}
      <div className="edit-container">
        <button onClick={resetTable} className="btn mt-1 btn-delete">
          {translation.reset}
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  .edit-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export default ListInfo;
