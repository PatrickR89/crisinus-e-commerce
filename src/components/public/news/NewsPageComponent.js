import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useItemsContext } from "../../../contexts/items_context";
import formatDate from "../../../utils/dateFormatting";

const NewsPageComponent = () => {
    const { news } = useItemsContext();

    return (
        <main>
            <Wrapper>
                {news.map((n, index) => {
                    return (
                        <div className="news-container" key={index}>
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
                                        {n.text.substring(0, 500)}
                                    </p>
                                </div>
                                <div>
                                    <p className="date-muted">
                                        {formatDate(n.date)}
                                    </p>
                                    <hr />
                                </div>
                            </article>
                        </div>
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
    .news-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 10rem;
        width: 70vw;
        max-width: 100%;
        margin-top: 1rem;
    }
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

        height: 10rem;
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
`;

export default NewsPageComponent;
