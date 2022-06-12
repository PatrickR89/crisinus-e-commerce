import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { PageHero } from "../components";
import { useLanguageContext } from "../contexts/language_context";
import { useItemsContext } from "../contexts/items_context";
import formatDate from "../utils/dateFormatting";

const NewsExpandedPage = () => {
    const { id } = useParams();

    const { translation } = useLanguageContext();
    const { single_news, fetchSingleNews } = useItemsContext();
    console.log(single_news);
    useEffect(() => {
        fetchSingleNews(id);
    }, []);

    return (
        <main>
            <PageHero title={single_news.title} adress={translation.news} />
            <Wrapper>
                <div className="title">
                    <h2>{single_news.title}</h2>
                    <p>{formatDate(single_news.date)}</p>
                </div>
                <p className="news-text">
                    {single_news.images[0] && (
                        <img
                            src={`http://localhost:3001/${single_news.images[0]}`}
                            alt={single_news.title}
                            className="small-size"
                        />
                    )}
                    {single_news.text}
                </p>
            </Wrapper>
        </main>
    );
};

const Wrapper = styled.div`
    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .news-text {
        text-align: start;
    }
    .small-size {
        max-width: 30%;
    }
`;

export default NewsExpandedPage;
