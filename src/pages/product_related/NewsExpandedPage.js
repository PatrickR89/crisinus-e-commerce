import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PageHero } from "../../components/public/elements";
import { useLanguageContext } from "../../contexts/language_context";
import { useItemsContext } from "../../contexts/items_context";
import formatDate from "../../utils/dateFormatting";

const NewsExpandedPage = () => {
    const { id } = useParams();

    const { translation } = useLanguageContext();
    const { single_news, fetchSingleNews } = useItemsContext();
    useEffect(() => {
        fetchSingleNews(id);
        // eslint-disable-next-line
    }, [id]);

    return (
        <main>
            <PageHero
                title={single_news.title}
                adress={translation.news}
                link={"news"}
            />
            <Wrapper>
                <div className="title">
                    <h2>{single_news.title}</h2>
                    <p>{formatDate(single_news.date)}</p>
                </div>
                <article className="news-text">
                    {single_news.images[0] && (
                        <img
                            src={`/${single_news.images[0]}`}
                            alt={single_news.title}
                            className="small-size left"
                        />
                    )}
                    <p className="news-text">{`${single_news.text}`}</p>
                </article>
            </Wrapper>
        </main>
    );
};

const Wrapper = styled.div`
    margin-bottom: 2rem;
    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .small-size {
        max-width: 35%;
        max-height: 300px;
    }
    .left {
        float: right;
        margin-right: 1rem;
        margin-bottom: 1rem;
    }
    .right {
        float: right;
        margin-left: 1rem;
        margin-top: 1rem;
    }
    .news-text {
        text-align: start;
        margin-bottom: 2rem;
        p {
            overflow: visible;
        }
    }
    .news-text {
        white-space: pre-wrap;
        margin: 0.5rem;
    }
`;

export default NewsExpandedPage;
