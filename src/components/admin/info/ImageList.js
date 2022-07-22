import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCameraRetro } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import styled from "styled-components";
import axios from "axios";

const ImageList = () => {
    const [images, setImages] = useState([]);

    const getImages = () => {
        axios
            .get("/api/images/getimages")
            .then((response) => {
                setImages(response.data);
            })
            .catch((err) => {
                axios.post("/api/system/error", { err });
            });
    };

    const handleDeleteImage = (url) => {
        axios.post("/api/images/deleteimages", { url }).catch((err) => {
            axios.post("/api/system/error", { err });
        });
    };

    useEffect(() => {
        getImages();
    }, []);
    return (
        <Wrapper>
            <h2>Images:</h2>
            <div className="thumb-container">
                {images &&
                    images.map((image, index) => {
                        return (
                            <div key={index} className="single-thumb">
                                <p>{image.name}</p>
                                <img
                                    className="thumb"
                                    src={`/${image.source}`}
                                    alt=""
                                />
                                <button
                                    className="btn btn-delete"
                                    onClick={() =>
                                        handleDeleteImage(image.source)
                                    }
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        );
                    })}
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .thumb-container {
        display: flex;
        align-items: flex-start;
        height: 250px;
    }
    .single-thumb {
        display: flex;
        flex-direction: column;
        align-items: space-around;
        justify-content: space-between;
        height: 100%;
        max-width: 200px;
        margin: 2rem;
    }
    .thumb {
        max-width: 150px;
        margin: auto;
    }
`;

export default ImageList;
