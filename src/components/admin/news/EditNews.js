import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa";

import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useLanguageContext } from "../../../contexts/language_context";

const EditNews = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { header } = useAuthenticationContext();
    const { translation } = useLanguageContext();

    const [initialNews, setInitialNews] = useState({
        title: "",
        text: "",
        images: [],
        date: ""
    });

    const [title, setTitle] = useState("");
    const [images, setImages] = useState([]);
    const [text, setText] = useState("");

    const initializeNews = () => {
        setTitle(initialNews.title);
        setImages(initialNews.images);
        setText(initialNews.text);
    };

    const getNews = () => {
        axios
            .post(`/api/news/${id}`, { headers: header(), id })
            .then((response) => {
                if (
                    response.data === "Token required" ||
                    response.data.auth === false
                )
                    return navigate("/admin/login", { replace: true });
                setInitialNews(response.data[0]);
            })
            .catch((error) => {
                const err = `api: /api/news/${id} [editnews[POST]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };

    const editNews = () => {
        axios
            .put(`/api/news/${id}`, {
                headers: header(),
                id,
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
                const info = `${id} news edited`;
                axios.post("/api/system/info", { info });
            })
            .catch((error) => {
                const err = `api: /api/news/${id} [editnews[PUT]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });

        navigate("/admin/newslist", { replace: true });
    };

    const handleAddImages = (e) => {
        const data = new FormData();
        const files = [...e.target.files];
        files.forEach((file) => {
            data.append("images", file);
        });

        axios
            .post("/api/images/addimages", data)
            .then((res) => {
                console.log(res.data);
                const tempImages = [...images];
                res.data.forEach((image) => {
                    console.log(image);
                    tempImages.push(image.path);
                });
                setImages(tempImages);
            })
            .catch((error) => {
                const err = `api: /api/images/addimage [editnews[POST]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
    };

    const handleDeleteImage = (url) => {
        axios.post("/api/images/deleteimages", { url }).catch((error) => {
            const err = `api: /api/images/deleteimage [editnews[POST]], error: ${error}`;
            axios.post("/api/system/error", { err });
        });
        const tempUrls = images.filter((image) => image !== url);
        setImages(tempUrls);
    };

    const handleDelete = () => {
        axios
            .delete(`/api/news/${id}`, {
                headers: header(),
                data: { id: id }
            })
            .then((response) => {
                if (
                    response.data === "Token required" ||
                    response.data.auth === false
                )
                    return navigate("/admin/login", { replace: true });
                const info = `${id} news deleted`;
                axios.post("/api/system/info", { info });
            })
            .catch((error) => {
                const err = `api: /api/news/${id} [editnews[DELETE]], error: ${error}`;
                axios.post("/api/system/error", { err });
            });
        navigate("/admin/newslist", { replace: true });
    };

    useEffect(() => {
        getNews();
    }, []);

    useEffect(() => {
        initializeNews();
    }, [initialNews]);

    return (
        <Wrapper>
            <h2>
                {translation.edit} {translation.news}
            </h2>
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
                    {translation.images}
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
                    <button onClick={editNews} className="btn mt-1">
                        {translation.edit}
                    </button>
                    <button
                        className="btn mt-1 btn-delete"
                        onClick={handleDelete}
                    >
                        {translation.delete}
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
`;

export default EditNews;
