import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa";

import { useAuthenticationContext } from "../../../contexts/authentication_context";

const EditNews = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { header } = useAuthenticationContext();

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
            .post(`/news/${id}`, { headers: header(), id })
            .then((response) => {
                if (
                    response.data === "Token required" ||
                    response.data.auth === false
                )
                    return navigate("/admin/login", { replace: true });
                setInitialNews(response.data[0]);
            });
    };

    const editNews = () => {
        axios
            .put(`/news/${id}`, {
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
            });

        navigate("/admin/newslist", { replace: true });
    };

    const handleAddImages = (e) => {
        const data = new FormData();
        const files = [...e.target.files];
        files.forEach((file) => {
            data.append("images", file);
        });

        axios.post("/images/addimages", data).then((res) => {
            console.log(res.data);
            const tempImages = [...images];
            res.data.forEach((image) => {
                console.log(image);
                tempImages.push(image.path);
            });
            console.log(tempImages);
            setImages(tempImages);
        });
    };

    const handleDeleteImage = (url) => {
        axios.post("/images/deleteimages", { url });
        const tempUrls = images.filter((image) => image !== url);
        setImages(tempUrls);
    };

    const handleDelete = () => {
        axios
            .delete(`/news/${id}`, {
                headers: header(),
                data: { id: id }
            })
            .then((response) => {
                if (
                    response.data === "Token required" ||
                    response.data.auth === false
                )
                    return navigate("/admin/login", { replace: true });
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
                <label htmlFor="title">News title:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="text">News text:</label>
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
                        Edit news
                    </button>
                    <button
                        className="btn mt-1 btn-delete"
                        onClick={handleDelete}
                    >
                        DELETE news
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
