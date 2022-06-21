import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCameraRetro } from "react-icons/fa";

import styled from "styled-components";
import axios from "axios";

import { useAuthenticationContext } from "../../contexts/authentication_context";

const AddGift = () => {
    const { header } = useAuthenticationContext();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [max_order, setMax_order] = useState(0);
    const [images, setImages] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

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

    const addGift = () => {
        axios
            .post("/giftshop/addgift", {
                headers: header(),
                name,
                price,
                max_order,
                images,
                description
            })
            .then((response) => {
                if (
                    response.data === "Token required" ||
                    response.data.auth === false
                )
                    return navigate("/admin/login", { replace: true });
            });

        navigate("/admin/giftshoplist", { replace: true });
    };

    return (
        <Wrapper>
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
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="max_order">Maximum available amount:</label>
                <input
                    type="number"
                    name="max_order"
                    id="max_order"
                    value={max_order}
                    onChange={(e) => setMax_order(e.target.value)}
                />
                <label htmlFor="description">Description:</label>
                <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="edit-container">
                    <button onClick={addGift} className="btn mt-1">
                        Add item to giftshop
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

export default AddGift;
