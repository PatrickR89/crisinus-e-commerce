import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImageSelectModalContainer } from "./ImageSelectModalContainer";

const ImageSelectModal = ({ closeModal, handleClick }) => {
  const [images, setImages] = useState([]);

  const getImages = () => {
    axios
      .get("/api/images/getimages")
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        const err = `api: /api/images/getimages [imagelist[GET]], error: ${error}`;
        axios.post("/api/system/error", { err });
      });
  };

  useEffect(() => {
    getImages();
  }, []);
  return (
    <ImageSelectModalContainer>
      <div className="content glass">
        <div className="header">
          <h2>Odaberite sliku od unešenih</h2>
        </div>
        <div className="body">
          {images?.length !== undefined &&
            images.map((image) => {
              return (
                <button
                  key={image.id}
                  className="image-btn"
                  onClick={() => {
                    handleClick(image.source);
                    closeModal();
                  }}
                >
                  <img
                    className="modal-thumb"
                    src={`/${image.source}`}
                    alt=""
                  />
                  <p>{image.name}</p>
                </button>
              );
            })}
        </div>
        <div className="footer">
          <button className="btn" onClick={closeModal}>
            Zatvori
          </button>
        </div>
      </div>
    </ImageSelectModalContainer>
  );
};

export default ImageSelectModal;
