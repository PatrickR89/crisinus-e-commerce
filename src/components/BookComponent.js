import React from "react";
import styled from "styled-components";
import noPic from "../defaults/bookCover.jpeg";
import { useCurrencyContext } from "../contexts/currency_context";

const BookComponent = ({ title, authors, price, images }) => {
    const { priceFormat } = useCurrencyContext();

    return (
        <Wrapper>
            <div className="select">
                {images[0] ? (
                    <img
                        className="image"
                        src={`/${images[0]}`}
                        alt="book cover"
                    />
                ) : (
                    <img className="image" src={noPic} alt="book cover" />
                )}
                <h4 className="title">{title}</h4>
                {authors.map((author, index) => {
                    return <p key={index}>{author.last_name}</p>;
                })}
                <p>{priceFormat(price)}</p>
            </div>
        </Wrapper>
    );
};
const Wrapper = styled.div`
    display: block;

    h4 {
        display: flex;
        font-size: 15px;
        margin-bottom: 0.2rem;
        color: var(--clr-title-4);
    }
    p {
        text-transform: capitalize;
        font-size: 12px;
    }
    .image {
        margin-top: 0.5rem;
        width: 150px;
    }
`;
export default BookComponent;
