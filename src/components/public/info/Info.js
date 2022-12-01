import React from "react";
import styled from "styled-components";

const Info = ({ title, content, images }) => {
  return (
    <main>
      <Wrapper>
        <h1>{title}</h1>
        <div className="news-text">
          {images.length > 0 && images[0] && (
            <img
              src={`/${images[0]}`}
              alt={title}
              className="small-size right"
            />
          )}
          <p className="line-break">{content}</p>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin: auto auto 2rem auto;
  h1 {
    color: var(--clr-primary-1);
    margin-left: 2rem;
    margin-bottom: 2rem;
  }
  p {
    color: var(--clr-par-5);
    text-align: start;
    margin: auto;
  }

  .small-size {
    max-width: 45%;
    max-height: 20%;
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
  @media (max-width: 1190px) {
    h1 {
      margin-left: 3rem;
    }
    p {
      margin: auto 2rem;
    }
  }
`;

export default Info;
