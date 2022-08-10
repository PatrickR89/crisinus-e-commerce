import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { useLanguageContext } from "../../../contexts/language_context";

const GiftshopList = () => {
    const { translation } = useLanguageContext();
    const [gsList, setGsList] = useState([]);

    const getGifts = () => {
        axios
            .get("/api/giftshop/")
            .then((response) => {
                setGsList(response.data);
            })
            .catch((error) => {
                const err = `api: /api/giftshop/} [giftslist[GET]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };

    useEffect(() => {
        getGifts();
    }, []);

    return (
        <Wrapper>
            <h2>{translation.giftshopList.toUpperCase()}</h2>

            <div className="per-gift head">
                <section>ID</section>
                <section>{translation.name.toUpperCase()}</section>
                <section>{translation.price.toUpperCase()}</section>
                <section>{translation.maxOrder.toUpperCase()}</section>
                <section>{translation.description.toUpperCase()}</section>
            </div>
            {gsList.length > 0 &&
                gsList.map((gift, index) => {
                    return (
                        <Link to={`/admin/editgift/${gift.id}`}>
                            <div
                                key={index}
                                className={
                                    index % 2 === 0
                                        ? "itm-background-one per-gift on-hover-list"
                                        : "itm-background-two per-gift on-hover-list"
                                }
                            >
                                <p>{gift.id}</p>

                                <h4>{gift.name}</h4>

                                <p>{gift.price}</p>
                                <p>{gift.max_order}</p>
                                {gift.description && (
                                    <p>
                                        {gift.description.substring(0, 25)}...
                                    </p>
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
    .per-gift {
        display: inline-grid;
        grid-template-columns: repeat(5, 1fr);
        align-items: center;
    }
`;
export default GiftshopList;
