import React from "react";

import { useLanguageContext } from "../../../contexts/language_context";
import { PropertiesContainer } from "./PropertiesContainer";

const BookProperties = ({ properties }) => {
  const { translation } = useLanguageContext();
  if (properties === null) {
    return null;
  }

  if (properties?.cover === undefined || properties?.pages === undefined) {
    return null;
  }
  if (properties.cover === "NULL" && properties.pages <= 0) {
    return null;
  }

  return (
    <PropertiesContainer>
      <h4 className="tag dim-title">{translation.properties}:</h4>
      {properties.cover !== "NULL" ? (
        <div className="single-container">
          <span>{translation.bookCover}:</span>
          {properties.cover === "HARDCOVER" ? (
            <p>{translation.hardcover}</p>
          ) : (
            <p>{translation.paperback}</p>
          )}
        </div>
      ) : (
        <></>
      )}

      {properties.pages > 0 ? (
        <div className="single-container">
          <span>{translation.noOfPages}:</span>
          <p>{properties.pages}</p>
        </div>
      ) : (
        <></>
      )}
    </PropertiesContainer>
  );
};

export default BookProperties;
