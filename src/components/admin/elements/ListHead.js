import React from "react";

const ListHead = ({ colTitles }) => {
  const style = {
    display: "inline-grid",
    gridTemplateColumns: `repeat(${colTitles.length}, 1fr)`,
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    marginBottom: "1rem"
  };
  return (
    <div style={style}>
      {colTitles.map((title, index) => {
        return <section key={index}>{title.toUpperCase()}</section>;
      })}
    </div>
  );
};

export default ListHead;
