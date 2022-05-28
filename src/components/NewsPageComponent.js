import React from "react";
import styled from "styled-components";
import { useItemsContext } from "../contexts/items_context";

const NewsPageComponent = () => {
  const { news } = useItemsContext();

  return (
    <Wrapper>
      {news.map((n, index) => {
        return (
          <div className="news-container">
            <div className="image-container">
              {n.image && <img src={n.image} alt={n.title} />}
            </div>
            <article className="news-text">
              <div>
                {index === 0 && <hr />}
                <h2>{n.title}</h2>
                <p className="news-paragraph">{n.text.substring(0, 500)}</p>
              </div>
              <div>
                <p className="date-muted">{n.date}</p>
                <hr />
              </div>
            </article>
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  .news-container {
    display: flex;
    flex-direction: row;
    height: 10rem;
    width: 100%;
    margin-top: 1rem;
  }
  .image-container {
    width: 25%;
    height: 100%;
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
  }
`;

export default NewsPageComponent;
