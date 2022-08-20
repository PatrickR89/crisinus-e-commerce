import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListLink = ({ index, cols, url, children, modal, handleClick }) => {
  const background = (index) => {
    if (index % 2 === 0) {
      return "hsl(215, 20%, 95%)";
    } else {
      return "hsl(45, 88%, 95%)";
    }
  };
  const style = {
    backgroundColor: background(index),
    display: "inline-grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    alignItems: "center",
    width: "100%"
  };

  if (modal) {
    return (
      <UselessButton onClick={handleClick}>
        <div className="on-hover-list" style={style}>
          {children}
        </div>
      </UselessButton>
    );
  }

  return (
    <Link to={url}>
      <div className="on-hover-list" style={style}>
        {children}
      </div>
    </Link>
  );
};

const UselessButton = styled.button`
  font-family: inherit;
  border: none;
`;

export default ListLink;
