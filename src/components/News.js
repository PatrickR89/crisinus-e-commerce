import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { SingleNews } from "../components";
import { useItemsContext } from "../contexts/items_context";

const News = ({ newsPage, home }) => {
    const { fetchSingleNews, news, single_news } = useItemsContext();

    const [tempIndex, setTempIndex] = useState(0);

    useEffect(() => {
        if (home && news.length) {
            const indexTimeout = setTimeout(() => {
                if (tempIndex > 0) {
                    setTempIndex(tempIndex - 1);
                } else {
                    setTempIndex(news.length - 1);
                }
            }, 5000);
            fetchSingleNews(news[tempIndex].id);
            return () => {
                clearTimeout(indexTimeout);
            };
        }
    }, [tempIndex, news]);

    if (home) {
        return (
            <main>
                <Wrapper>
                    <div className="single-home">
                        <SingleNews {...single_news} />
                    </div>
                </Wrapper>
            </main>
        );
    }

    return (
        <main>
            <Wrapper>
                <div className={newsPage ? "n-page single" : "single-home"}>
                    <SingleNews {...single_news} />
                </div>
            </Wrapper>
        </main>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 23vh;

    .single {
        width: 74%;
        height: 100%;
        overflow: auto;
        position: relative;
    }
    .single-home {
        width: 100%;
        height: 100%;
        overflow: auto;
        position: relative;
        margin: 0.5rem;
    }
    .list {
        width: 24%;
        height: 100%;
        overflow: auto;
    }
    .li-item {
        transition: 0.1s ease-in;
        text-transform: capitalize;
    }
    .n-page {
        font-size: 1rem;
    }
    @media (max-width: 1000px) {
        .single {
            width: 100%;
            margin: auto;
        }
    }
    @media (max-width: 650px) {
        .single {
            width: 85%;
        }
        .list {
            width: 15%;
        }
    }
`;

export default News;
