import React from "react";
import styled from "styled-components";
import { useCartContext } from "../../../contexts/cart_context";
import { useCurrencyContext } from "../../../contexts/currency_context";
import { FaRegTimesCircle } from "react-icons/fa";
import { ItemAmount } from "./";
import { useLanguageContext } from "../../../contexts/language_context";

const CartItem = ({ title, name, id, max, price, amount }) => {
    const { removeItem, toggleAmount } = useCartContext();
    const { priceFormat } = useCurrencyContext();
    const { translation } = useLanguageContext();

    const increase = () => {
        toggleAmount(id, "inc");
    };
    const decrease = () => {
        toggleAmount(id, "dec");
    };
    return (
        <Wrapper>
            <div className="fields">
                <div className="item-name itm">
                    <h2>{name ? `${name}` : `${title}`}</h2>
                </div>
                <div className="item-col itm">
                    <p className="toggle-side">{translation.price}:</p>
                    <p>{priceFormat(price)}</p>
                </div>
                <div className="item-col itm">
                    <ItemAmount
                        stock={max}
                        amount={amount}
                        increase={() => increase(id)}
                        decrease={() => decrease(id)}
                    />
                </div>
                <div className="item-col itm">
                    <p className="toggle-side">{translation.subtotal}: </p>
                    <p>{priceFormat(price * amount)}</p>
                </div>
                <div className="itm">
                    <button
                        className="btn btn-remove"
                        type="button"
                        onClick={() => removeItem(id)}
                    >
                        <FaRegTimesCircle />
                    </button>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    .btn-remove {
        background: transparent;
        box-shadow: none;
        font-size: 1.5rem;
        color: var(--clr-par-6);
    }
    .btn-remove:hover {
        color: var(--clr-clear-hover);
    }
    .toggle-side {
        margin-right: 1rem;
    }
    @media (max-width: 900px) {
        .fields {
            display: block;
            justify-content: center;
        }
        .itm {
            margin: auto;
        }
    }
`;

export default CartItem;
