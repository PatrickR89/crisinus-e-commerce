import React from "react";
import styled from "styled-components";

import { useLanguageContext } from "../../../contexts/language_context";

const DimensionsContainer = ({ dimensions }) => {
  const { translation } = useLanguageContext();
  if (dimensions === null) {
    return null;
  }

  if (
    dimensions.weight <= 0 &&
    dimensions.height <= 0 &&
    dimensions.width <= 0 &&
    dimensions.depth <= 0
  ) {
    return null;
  }

  function calcLength(value) {
    if (value > 999) {
      return `${(value / 1000).toFixed(2)} m`;
    } else if (value > 99) {
      return `${(value / 100).toFixed(2)} cm`;
    } else {
      return `${value} mm`;
    }
  }

  function calcWeight(value) {
    if (value > 99) {
      return `${(value / 1000).toFixed(2)} kg`;
    } else {
      return `${value} g`;
    }
  }

  return (
    <Wrapper>
      <h4 className="tag dim-title">{translation.dimensions}:</h4>
      {dimensions.width > 0 ? (
        <div className="single-container">
          <span>{translation.width}:</span>
          <p>{calcLength(dimensions.width)}</p>
        </div>
      ) : (
        <></>
      )}

      {dimensions.height > 0 ? (
        <div className="single-container">
          <span>{translation.height}:</span>
          <p>{calcLength(dimensions.height)}</p>
        </div>
      ) : (
        <></>
      )}

      {dimensions.depth > 0 ? (
        <div className="single-container">
          <span>{translation.depth}:</span>
          <p>{calcLength(dimensions.depth)}</p>
        </div>
      ) : (
        <></>
      )}

      {dimensions.weight > 0 ? (
        <div className="single-container">
          <span>{translation.weight}:</span>
          <p>{calcWeight(dimensions.weight)}</p>
        </div>
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
      text-transform: capitalize;
    }

    p {
      margin-left: auto;
    }
  }
`;

export default DimensionsContainer;
