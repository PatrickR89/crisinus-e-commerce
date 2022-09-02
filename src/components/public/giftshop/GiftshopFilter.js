import React from "react";
import styled from "styled-components";
import { FaRegTimesCircle } from "react-icons/fa";
import { useCurrencyContext } from "../../../contexts/currency_context";
import { useLanguageContext } from "../../../contexts/language_context";
import { useFilterContext } from "../../../contexts/filter_context";

const GiftshopFilter = () => {
  const {
    gifts_filters: { text, min_price, max_price, price },
    updateGiftsFilter,
    clearGiftsFilter
  } = useFilterContext();
  const { priceFormat } = useCurrencyContext();
  const { translation } = useLanguageContext();

  return (
    <Wrapper>
      <form onSubmit={(e) => e.preventDefault()} className="gift-form">
        <div className="filter-input">
          <label htmlFor="text">{translation.name}: </label>
          <input
            type="text"
            name="text"
            id="text"
            placeholder={translation.search}
            className="search-input"
            value={text}
            onChange={updateGiftsFilter}
          />
        </div>
        <div className="price-form">
          <label htmlFor="price">{translation.price}: </label>
          <input
            type="range"
            name="price"
            id="price"
            className="price-range"
            min={min_price}
            max={max_price}
            value={price}
            onChange={updateGiftsFilter}
          />
          <p className="price">{priceFormat(price)}</p>
        </div>
      </form>
      <div className="btn-container">
        <button
          type="button"
          className="clear-filter"
          onClick={clearGiftsFilter}
        >
          <FaRegTimesCircle />
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: var(--clr-button-3);
  padding: 0.5rem 0;
  margin-top: -2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
  form {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    width: 90%;
    margin-left: 2rem;
    label {
      font-size: 1.5rem;
      margin-right: 1rem;
      color: var(--clr-par-6);
    }
    .filter-input {
      input {
        background: var(--clr-button-3);
        border: none;
        font-size: 1.5rem;
        color: var(--clr-par-6);
        transition: 0.2s ease-in;
      }
      input:focus {
        outline: none;
        background: var(--clr-button-4);
      }
      input:hover {
        background: var(--clr-button-4);
      }
    }
  }
  .price-form {
    display: flex;
    align-items: center;
    .price {
      margin-top: 0.2rem;
      color: var(--clr-par-6);
    }
    .price-range {
      -webkit-appearance: none; /* Override default CSS styles */
      appearance: none;
      width: 15rem;
      height: 0.2rem;
      background: var(--clr-button-2);
      outline: none;
      -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
      transition: opacity 0.2s;
      margin-top: 0.5rem;
      margin-right: 1rem;
    }

    .price-range::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: var(--clr-primary-2);
      cursor: pointer;
    }

    .price-range::-moz-range-thumb {
      -webkit-appearance: none;
      width: 15px;
      height: 5px;
      border-radius: 50%;
      background: #04aa6d;
      cursor: pointer;
    }
    .price-range:hover {
      background: var(--clr-button-4);
    }
  }
  .clear-filter {
    border: none;
    background: transparent;
    font-size: 1.5rem;
    transition: 0.2s ease-in;
    margin-right: auto;
  }
  .clear-filter:hover {
    cursor: pointer;
    color: var(--clr-clear-hover);
  }
  .btn-container{
    margin: auto;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .btn-container {
      width:100%;
      display: block;
      align-items: center;
      justify-content: center;
    }
  form {
    flex-direction: column;
    align-items: start;
  }
  @media (max-width: 500px) {
    form{
      label {
        font-size: 0.9rem;
      }
      .filter-input {
      input {
        font-size: 0.9rem;
      }
    }
    }
    .price-form{
    .price-range{
      width: 8rem;
    }
    }
  }
`;

export default GiftshopFilter;
