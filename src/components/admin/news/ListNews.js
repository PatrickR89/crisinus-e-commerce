import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const ListNews = () => {
    const [newsList, setNewsList] = useState([]);

    const getNews = () => {
        axios
            .get("/api/news/")
            .then((response) => {
                setNewsList(response.data);
            })
            .catch((error) => {
                const err = `api: /api/news/ [listnews[GET]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };

    const formatDate = (date) => {
        const tempDate = new Date(date);
        const doubleDigit = (num) => {
            return num.toString().padStart(2, "0");
        };
        return [
            doubleDigit(tempDate.getDate()),
            doubleDigit(tempDate.getMonth() + 1),
            tempDate.getFullYear()
        ].join("/");
    };

    useEffect(() => {
        getNews();
    }, []);

    return (
        <Wrapper>
            News List
            <div className="per-gift head">
                <section>ID</section>
                <section>NEWS TITLE</section>
                <section>TEXT</section>
                <section>DATE</section>
            </div>
            {newsList.length > 0 &&
                newsList.map((news, index) => {
                    return (
                        <Link to={`/admin/editnews/${news.id}`}>
                            <div
                                key={index}
                                className={
                                    index % 2 === 0
                                        ? "itm-background-one per-gift on-hover-list"
                                        : "itm-background-two per-gift on-hover-list"
                                }
                            >
                                <p>{news.id}</p>

                                <h4>{news.title}</h4>

                                {news.text && (
                                    <p>{news.text.substring(0, 15)}...</p>
                                )}
                                <p>{news.date && formatDate(news.date)}</p>
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
        grid-template-columns: repeat(4, 1fr);
        align-items: center;
    }
`;

export default ListNews;
