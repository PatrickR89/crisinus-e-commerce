import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { useAuthenticationContext } from "../../../contexts/authentication_context";

const ListInfo = () => {
    const navigate = useNavigate();

    const { header } = useAuthenticationContext();

    const [infoList, setInfoList] = useState([]);

    const getInfoPages = () => {
        axios
            .get("/api/infopages/")
            .then((response) => {
                setInfoList(response.data);
            })
            .catch((err) => {
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
            .catch((err) => {
                axios.post("/api/system/error", { err });
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
                                    <p>
                                        {infoPage.content.substring(0, 15)}...
                                    </p>
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
