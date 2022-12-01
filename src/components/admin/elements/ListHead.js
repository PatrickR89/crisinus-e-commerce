import React from "react";

const ListHead = ({ colTitles, btn }) => {
  const width = btn ? "95%" : "100%";
  const style = {
    display: "inline-grid",
    gridTemplateColumns: `repeat(${colTitles.length}, 1fr)`,
    alignItems: "center",
    textAlign: "center",
    width: width,
    marginBottom: "1rem"
  };
  return (
    <div style={style}>
      {colTitles.length > 0 &&
        colTitles.map((title, index) => {
          return <section key={index}>{title.toUpperCase()}</section>;
        })}
    </div>
  );
};

export default ListHead;
