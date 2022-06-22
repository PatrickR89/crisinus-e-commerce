import React from "react";
import styled from "styled-components";
import { useAuthorsContext } from "../../../contexts/authors_context";

const NoCurrentAuthor = ({ authorNavigate }) => {
    const { authors, activeAuthor } = useAuthorsContext();
    return (
        <Wrapper className="solo">
            <div className="menu-left center">
                <ul>
                    {authors.map((author, index) => {
                        return (
                            <li key={index}>
                                <button
                                    className={
                                        author.id === activeAuthor.id
                                            ? "btn select current"
                                            : " btn select"
                                    }
                                    disabled={
                                        author.id === activeAuthor.id
                                            ? true
                                            : false
                                    }
                                    onClick={() => authorNavigate(author.id)}
                                >
                                    {author.name} {author.last_name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    margin: 2rem 1rem;
`;

export default NoCurrentAuthor;
