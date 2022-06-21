import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCameraRetro } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import styled from "styled-components";
import axios from "axios";

import { useAuthenticationContext } from "../../contexts/authentication_context";

const EditInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { header } = useAuthenticationContext();

    const [initialPage, setInitialPage] = useState({
        title: "",
        show_title: "",
        images: [],
        content: ""
    });

    const [images, setImages] = useState([]);
    const [content, setContent] = useState("");

    const initializeItem = () => {
        setImages(initialPage.images);
        setContent(initialPage.content);
    };

    useEffect(() => {
        getPage();
    }, []);

    useEffect(() => {
        initializeItem();
    }, [initialPage]);

    const getPage = () => {
        axios
            .post("/infopages/getinfobyid", {
                headers: header(),
                id
            })
            .then((response) => {
                if (
                    response.data === "Token required" ||
                    response.data.auth === false
                )
                    return navigate("/admin/login", { replace: true });
                setInitialPage(response.data[0]);
            });
    };

    const handleAddImages = (e) => {
        const data = new FormData();
        const files = [...e.target.files];
        files.forEach((file) => {
            data.append("images", file);
        });

        axios.post("/images/addimages", data).then((res) => {
            const tempImages = [...images];
            res.data.forEach((image) => {
                tempImages.push(image.path);
            });
            setImages(tempImages);
        });
    };

    const handleDeleteImage = (url) => {
        axios.post("/images/deleteimages", { url });
        const tempUrls = images.filter((image) => image !== url);
        setImages(tempUrls);
    };

    const editInfo = () => {
        axios
            .put("/infopages/editinfo", {
                headers: header(),
                id,
                images,
                content
            })
            .then((response) => {
                if (
                    response.data === "Token required" ||
                    response.data.auth === false
                )
                    return navigate("/admin/login", { replace: true });
            });
        navigate("/admin/infolist", { replace: true });
    };
    return (
        <Wrapper>
            <h2>{initialPage.show_title}</h2>
            <div className="thumb-container">
                {images &&
                    images.map((url, index) => {
                        return (
                            <div key={index} className="single-thumb">
                                <p>{url}</p>
                                <img className="thumb" src={`/${url}`} alt="" />
                                <button
                                    className="btn btn-delete"
                                    onClick={() => handleDeleteImage(url)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        );
                    })}
            </div>
            <div className="info">
                <label htmlFor="images" className="photo-input">
                    Images:
                    <input
                        type="file"
                        name="images"
                        multiple
                        id="images"
                        className="hidden-input"
                        onChange={handleAddImages}
                    />
                    <article className="btn">
                        <FaCameraRetro className="icon-large" /> Add image
                    </article>
                </label>

                <label htmlFor="content">Content:</label>
                <textarea
                    name="content"
                    id="content"
                    cols="30"
                    rows="10"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className="edit-container">
                    <button onClick={editInfo} className="btn mt-1">
                        Edit page
                    </button>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    h2 {
        color: var(--clr-red-dark);
    }
    .info {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        margin-bottom: 2rem;
        label {
            font-size: 1.5rem;
            text-transform: capitalize;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
        }
        input {
            height: 2rem;
            font-size: 1.5rem;
            width: 100%;
        }
        textarea {
            width: 100%;
            font-size: 1.2rem;
        }
    }
    .edit-header {
        height: 250px;
        margin-bottom: 2rem;
    }
    .thumb-container {
        display: flex;
        justify-content: space-between;
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
    }
    .thumb {
        max-width: 150px;
        margin: auto;
    }
    .authors {
        width: 100%;
    }
    .hidden-input {
        display: none;
    }
    .icon-large {
        font-size: 1.2rem;
    }
    .photo-input {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        article {
            margin-top: 0.5rem;
        }
    }
    .single-author {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        input {
            margin: 1rem;
            width: 40%;
        }
    }
    .list-com {
        width: 20%;
        display: flex;
        flex-direction: row;
        .btn {
            margin: 0.2rem 0.5rem;
        }
    }
    img {
        max-width: 200px;
    }
    .edit-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

export default EditInfo;
