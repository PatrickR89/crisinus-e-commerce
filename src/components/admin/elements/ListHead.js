import React from "react";

const ListHead = ({ colTitles, btn }) => {
  var width = "100%";
  if (btn === "1") {
    width = "95%";
  } else if (btn === "2") {
    width = "89%";
  }
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
      {colTitles?.length !== undefined &&
        colTitles?.length > 0 &&
        colTitles?.map((title, index) => {
          return <section key={index}>{title.toUpperCase()}</section>;
        })}
    </div>
  );
};

export default ListHead;
