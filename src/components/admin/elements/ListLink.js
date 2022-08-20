import React from "react";
import { Link } from "react-router-dom";

const ListLink = ({ index, cols, url, children }) => {
  console.log(cols);
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

  return (
    <Link to={url}>
      <div className="on-hover-list" style={style}>
        {children}
      </div>
    </Link>
  );
};

export default ListLink;
