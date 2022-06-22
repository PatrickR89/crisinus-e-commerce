import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const GiftshopList = () => {
    const [gsList, setGsList] = useState([]);

    const getGifts = () => {
        axios.get("/giftshop/").then((response) => {
            setGsList(response.data);
        });
    };

    useEffect(() => {
        getGifts();
    }, []);

    return (
        <Wrapper>
            Giftshop List
            <div className="per-gift head">
                <section>ID</section>
                <section>NAME</section>
                <section>PRICE</section>
                <section>MAX ORDER</section>
                <section>DESCRIPTION</section>
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
