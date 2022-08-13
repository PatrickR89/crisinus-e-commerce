import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useItemsContext } from "../../../contexts/items_context";
import formatDate from "../../../utils/dateFormatting";

const NewsPageComponent = () => {
    const { news, news_display } = useItemsContext();

    const NewsContainer = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: ${news_display.news_heigth}rem;
        width: {news_display.news_width}vw;
        max-width: 100%;
        margin: auto;
        h2 {
            font-size: ${news_display.news_title}rem;
        }
        .news-text {
            height: 100%;
        }
    `;

    return (
        <main>
            <Wrapper>
                {news.map((n, index) => {
                    return (
                        <NewsContainer key={index}>
                            <div className="image-container">
                                {n.images[0] && (
                                    <img
                                        src={`/${n.images[0]}`}
                                        alt={n.title}
                                    />
                                )}
                            </div>
                            <article className="news-text">
                                <div>
                                    {index === 0 && <hr />}
                                    <Link to={`/news/${n.id}`}>
                                        <h2>{n.title}</h2>
                                    </Link>
                                    <p className="news-paragraph">
                                        {n.text.substring(
                                            0,
                                            news_display.news_length
                                        )}
                                        ...
                                    </p>
                                </div>
                                <div>
                                    <p className="date-muted">
                                        {formatDate(n.date)}
                                    </p>
                                    <hr />
                                </div>
                            </article>
                        </NewsContainer>
                    );
                })}
            </Wrapper>
        </main>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    .image-container {
        width: 20%;
        height: 100%;
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
    .news-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: auto;
        width: 74%;

        h2 {
            text-align: start;
            margin-bottom: 0.5rem;
        }
    }
    .date-muted {
        text-align: end;
        color: var(--clr-primary-5);
        margin-top: auto;
    }
    .news-paragraph {
        text-align: start;
        margin-bottom: auto;
        min-width: 100%;
    }

    @media (max-width: 750px) {
        .image-container {
            display: none;
        }
        .news-text {
            width: 100%;
        }
    }
`;

export default NewsPageComponent;
