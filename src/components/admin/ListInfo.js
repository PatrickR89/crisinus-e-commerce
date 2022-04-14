import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const ListInfo = () => {
  const [infoList, setInfoList] = useState([]);

  const getInfoPages = () => {
    axios.get("http://localhost:3001/infopages/getinfo").then((response) => {
      setInfoList(response.data);
    });
  };

  const resetTable = () => {
    axios.post("http://localhost:3001/infopages/resetinfo").then((response) => {
      setInfoList(response.data);
    });
  };

  useEffect(() => {
    getInfoPages();
  }, []);

  return (
    <Wrapper>
      <div className="per-page head">
        <section>ID</section>
        <section>TITLE</section>
        <section>SHOWING TITLE</section>
        <section>CONTENT</section>
      </div>
      {infoList.length > 0 &&
        infoList.map((infoPage, index) => {
          return (
            <Link to={`/admin/editinfo/${infoPage.id}`}>
              <div
                key={index}
                className={
                  index % 2 === 0
                    ? "itm-background-one per-page on-hover-list"
                    : "itm-background-two per-page on-hover-list"
                }
              >
                <p>{infoPage.id}</p>

                <p>{infoPage.title}</p>
                <h4>{infoPage.show_title}</h4>

                {infoPage.content && (
                  <p>{infoPage.content.substring(0, 15)}...</p>
                )}
              </div>
            </Link>
          );
        })}
      <div className="edit-container">
        <button onClick={resetTable} className="btn mt-1 btn-delete">
          Reset table
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  .head {
    margin-bottom: 2rem;
  }
  .per-page {
    display: inline-grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    width: 100%;
  }
  .edit-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export default ListInfo;
