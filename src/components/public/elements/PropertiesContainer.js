import styled from "styled-components";

export const PropertiesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin-top: 2rem;
  width: 100%;
  .dim-title {
    margin-bottom: 0.5rem;
    font-weight: normal;
  }

  .single-container {
    display: flex;
    flex-direction: row;
    align-content: space-between;
    width: 100%;
    margin-top: 0.5rem;

    span {
      font-weight: bold;
      margin-right: 1rem;
      &::first-letter {
        text-transform: uppercase;
      }
    }

    p {
      margin-left: auto;
    }
  }
`;
