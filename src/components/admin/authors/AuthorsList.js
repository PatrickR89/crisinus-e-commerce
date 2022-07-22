import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const AuthorsList = () => {
    const [authorList, setAuthorList] = useState([]);

    const getAuthors = () => {
        axios
            .get("/api/authors/")
            .then((response) => {
                setAuthorList(response.data);
            })
            .catch((err) => {
                axios.post("/api/system/error", { err });
            });
    };

    useEffect(() => {
        getAuthors();
    }, []);

    return (
        <Wrapper>
            AuthorsList
            <div className="per-author head">
                <section>ID</section>
                <section>NAME</section>
                <section>WEB LINK</section>
                <section>BIO</section>
            </div>
            {authorList.length > 0 &&
                authorList.map((author, index) => {
                    return (
                        <Link to={`/admin/editauthor/${author.id}`}>
                            <div
                                key={index}
                                className={
                                    index % 2 === 0
                                        ? "itm-background-one per-author on-hover-list"
                                        : "itm-background-two per-author on-hover-list"
                                }
                            >
                                <p>{author.id}</p>

                                <h4>
                                    {author.name} {author.last_name}
                                </h4>

                                <p>{author.url}</p>
                                {author.bio && (
                                    <p>{author.bio.substring(0, 25)}...</p>
                                )}
                            </div>
                        </Link>
                    );
                })}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    .head {
        margin-bottom: 2rem;
    }
    .per-author {
        display: inline-grid;
        grid-template-columns: repeat(4, 1fr);
        align-items: center;
    }
`;

export default AuthorsList;
