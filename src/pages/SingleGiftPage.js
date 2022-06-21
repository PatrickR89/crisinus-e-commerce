import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useItemsContext } from "../contexts/items_context";
import { useCurrencyContext } from "../contexts/currency_context";
import { useLanguageContext } from "../contexts/language_context";

import { Slideshow, PageHero, AddToCart } from "../components";

const SingleGiftPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        fetchSingleGift,
        single_gift: gift,
        single_item_loading: loading,
        single_item_error: error
    } = useItemsContext();

    const { priceFormat } = useCurrencyContext();
    const { translation } = useLanguageContext();

    const { description, images, name, price } = gift;

    useEffect(() => {
        fetchSingleGift(id);
    }, [id]);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                navigate("/giftshop", { replace: true });
            }, 1500);
        }
    }, [error]);

    if (loading) {
        return (
            <div className="loading">
                <h1>{translation.pleaseWait}...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="loading">
                <h1>Unfortunately an error occured</h1>
            </div>
        );
    }

    return (
        <main>
            <PageHero
                title={name}
                adress={translation.giftshop}
                link={"giftshop"}
            />
            <Wrapper>
                <div className="title">
                    <h2>{name}</h2>
                    {images && <Slideshow images={images} />}
                </div>
                <div className="main">
                    <div className="info">
                        <p className="tag">{translation.price} : </p>
                        <span className="info-data">{priceFormat(price)}</span>
                        <AddToCart product={gift} />
                        <div className="secondary">
                            <div className="about">
                                <p className="tag">{translation.about} :</p>
                                <article>{description}</article>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </main>
    );
};
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    .main {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin: 2rem;
    }
    .title {
        width: 100%;
        text-align: start;
        margin: auto;
        h2 {
            text-transform: uppercase;
            margin: 1rem;
        }
    }
    .secondary {
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .about {
        display: grid;
        grid-column: 1;
        justify-content: center;

        article {
            font-size: 1rem;
            text-align: start;
        }
    }

    .tag {
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        color: var(--clr-primary-3);
    }
    .info-data {
        margin-bottom: 1rem;
    }

    .info {
        font-size: 1rem;
        span {
            font-weight: bold;
            text-transform: capitalize;
            margin-bottom: 2rem;
        }
    }

    @media (max-width: 850px) {
        flex-direction: column;
        .title {
            text-align: center;
        }
    }
`;

export default SingleGiftPage;
