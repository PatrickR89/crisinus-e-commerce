import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCameraRetro } from "react-icons/fa";

import styled from "styled-components";
import axios from "axios";

import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useLanguageContext } from "../../../contexts/language_context";

const AddNews = () => {
    const navigate = useNavigate();

    const { header } = useAuthenticationContext();
    const { translation } = useLanguageContext();

    const [title, setTitle] = useState("");
    const [images, setImages] = useState([]);
    const [text, setText] = useState("");

    const handleAddImages = (e) => {
        const data = new FormData();
        const files = [...e.target.files];
        files.forEach((file) => {
            data.append("images", file);
        });

        axios
            .post("/api/images/addimages", data)
            .then((res) => {
                const tempImages = [...images];
                res.data.forEach((image) => {
                    tempImages.push(image.path);
                });
                setImages(tempImages);
            })
            .catch((error) => {
                const err = `api: /api/images/addimages [addnews[POST]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };

    const addNews = () => {
        axios
            .post("/api/news/", {
                headers: header(),
                title,
                images,
                text
            })
            .then((response) => {
                if (
                    response.data === "Token required" ||
                    response.data.auth === false
                )
                    return navigate("/admin/login", { replace: true });
                const info = `${title} news added`;
                axios.post("/api/system/info", { info });
            })
            .catch((error) => {
                const err = `api: /api/news [addnews[POST]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });

        navigate("/admin/newslist", { replace: true });
    };

    return (
        <Wrapper>
            <h2>
                {translation.add} {translation.news}
            </h2>
            <div className="info">
                <label htmlFor="images" className="photo-input">
                    {translation.images}:
                    <input
                        type="file"
                        name="images"
                        multiple
                        id="images"
                        className="hidden-input"
                        onChange={handleAddImages}
                    />
                    <article className="btn">
                        <FaCameraRetro className="icon-large" />{" "}
                        {translation.addImage}
                    </article>
                </label>
                <label htmlFor="title">{translation.title}:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="text">{translation.content}:</label>
                <textarea
                    name="text"
                    id="text"
                    cols="30"
                    rows="10"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <div className="edit-container">
                    <button onClick={addNews} className="btn mt-1">
                        {translation.add}
                    </button>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
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
    .list-com {
        width: 20%;
        display: flex;
        flex-direction: row;
        .btn {
            margin: 0.2rem 0.5rem;
        }
    }
    .edit-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

export default AddNews;
