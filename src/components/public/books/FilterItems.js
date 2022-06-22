import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../../../contexts/filter_context";
import { useLanguageContext } from "../../../contexts/language_context";
import { getUniqueValues } from "../../../hooks/useFetchValues";
import { FaRegTimesCircle } from "react-icons/fa";

const FilterItems = ({ inSidebar }) => {
    const {
        filters: { title, author, year, publisher, language, genre },
        updateFilter,
        clearFilter,
        all_books
    } = useFilterContext();
    const { translation } = useLanguageContext();

    const publishers = getUniqueValues(all_books, "publisher");
    const years = getUniqueValues(all_books, "year").sort((a, b) => b - a);
    const languages = getUniqueValues(all_books, "language");
    const genres = getUniqueValues(all_books, "genre");
    const authors = getUniqueValues(all_books, "authors");

    return (
        <Wrapper>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="title-input">
                    <label htmlFor="title">{translation.title}:</label>
                    <input
                        type="title"
                        name="title"
                        placeholder={translation.search}
                        className="search-input"
                        value={title}
                        onChange={updateFilter}
                    />
                </div>
                <div
                    className={
                        !inSidebar ? "filters" : "filters filters-sidebar"
                    }
                >
                    <div>
                        <label htmlFor="author">{translation.author}: </label>
                        <select
                            name="author"
                            id="author"
                            value={author}
                            onChange={updateFilter}
                        >
                            {authors.map((a, index) => {
                                return (
                                    <option value={a} key={index}>
                                        {a}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="genre">{translation.genre}: </label>
                        <select
                            name="genre"
                            id="genre"
                            value={genre}
                            onChange={updateFilter}
                        >
                            {genres.map((g, index) => {
                                return (
                                    <option value={g} key={index}>
                                        {g}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="year">{translation.year}: </label>
                        <select
                            name="year"
                            id="year"
                            value={year}
                            onChange={updateFilter}
                        >
                            {years.map((y, index) => {
                                return (
                                    <option value={y} key={index}>
                                        {y}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="publisher">
                            {translation.publisher}:{" "}
                        </label>
                        <select
                            name="publisher"
                            id="publisher"
                            value={publisher}
                            onChange={updateFilter}
                        >
                            {publishers.map((p, index) => {
                                return (
                                    <option value={p} key={index}>
                                        {p}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="language">
                            {translation.language}:{" "}
                        </label>
                        <select
                            name="language"
                            id="language"
                            value={language}
                            onChange={updateFilter}
                        >
                            {languages.map((l, index) => {
                                return (
                                    <option value={l} key={index}>
                                        {l}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </form>
            <button
                type="button"
                className="clear-filter"
                onClick={clearFilter}
            >
                <FaRegTimesCircle />
            </button>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .title-input {
        margin-bottom: 1rem;
        label {
            font-size: 1.5rem;
            margin-right: 1rem;
            color: var(--clr-par-6);
            text-transform: capitalize;
        }
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
    .filters {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        font-size: 1.3rem;
        color: var(--clr-par-6);
        margin-bottom: 1rem;
        text-transform: capitalize;
        div {
            select {
                font-size: 1.3rem;
                background: var(--clr-button-3);
                border: none;
                transition: 0.2s ease-in;
            }
            select:hover {
                background: var(--clr-button-4);
            }
            select:focus {
                background: var(--clr-button-4);
                outline: none;
            }
        }
    }
    .filters-sidebar {
        flex-direction: column;
        align-items: start;
        div {
            margin-bottom: 1rem;
        }
    }

    .clear-filter {
        border: none;
        background: transparent;
        font-size: 1.5rem;
        transition: 0.2s ease-in;
    }
    .clear-filter:hover {
        cursor: pointer;
        color: var(--clr-clear-hover);
    }
`;

export default FilterItems;
