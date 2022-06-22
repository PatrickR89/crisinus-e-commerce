import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { useAuthenticationContext } from "../../../contexts/authentication_context";

const EditInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { header } = useAuthenticationContext();

    const [initialLink, setInitialLink] = useState({
        id: "",
        link: ""
    });

    const [linkPath, setLinkPath] = useState("");

    const initializeItem = () => {
        setLinkPath(initialLink.link);
    };

    useEffect(() => {
        fetchDBLink();
    }, []);

    useEffect(() => {
        initializeItem();
    }, [initialLink]);

    const fetchDBLink = () => {
        axios
            .post("/links", {
                headers: header(),
                id
            })
            .then((response) => {
                if (
                    response.data === "Token required" ||
                    response.data.auth === false
                )
                    return navigate("/admin/login", { replace: true });
                setInitialLink(response.data[0]);
            });
    };

    const editLink = () => {
        axios
            .put(`/links/${id}`, {
                headers: header(),
                id,
                link: linkPath
            })
            .then((response) => {
                if (
                    response.data === "Token required" ||
                    response.data.auth === false
                )
                    return navigate("/admin/login", { replace: true });
            });
        navigate("/admin/linkslist", { replace: true });
    };
    return (
        <Wrapper>
            <h2>{initialLink.id}</h2>
            <div className="info">
                <label htmlFor="content">link to:</label>
                <textarea
                    name="content"
                    id="content"
                    cols="30"
                    rows="10"
                    value={linkPath}
                    onChange={(e) => setLinkPath(e.target.value)}
                >
                    {initialLink.link}
                </textarea>
                <div className="edit-container">
                    <button onClick={editLink} className="btn mt-1">
                        Edit link
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
