import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const ListLinks = () => {
    const [linkList, setLinkList] = useState([]);

    const getLinks = () => {
        axios.get("/links").then((response) => {
            setLinkList(response.data);
        });
    };

    useEffect(() => {
        getLinks();
    }, []);

    return (
        <Wrapper>
            <div className="per-page head">
                <section>ID</section>
                <section>LINK</section>
            </div>
            {linkList.length > 0 &&
                linkList.map((singleLink, index) => {
                    return (
                        <Link to={`/admin/editlink/${singleLink.id}`}>
                            <div
                                key={index}
                                className={
                                    index % 2 === 0
                                        ? "itm-background-one per-page on-hover-list"
                                        : "itm-background-two per-page on-hover-list"
                                }
                            >
                                <p>{singleLink.id.toUpperCase()}</p>
                                {singleLink.link && (
                                    <p>{singleLink.link.substring(0, 20)}...</p>
                                )}
                            </div>
                        </Link>
                    );
                })}
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
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        width: 100%;
        padding: 0.5rem;
    }
    .edit-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
`;

export default ListLinks;
