import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState([{ name: "", last_name: "" }]);
  const [images, setImages] = useState([]);
  const [genre, setGenre] = useState("");
  const [maxOrder, setMaxOrder] = useState(0);
  const [price, setPrice] = useState(0);
  const [publisher, setPublisher] = useState("");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState(2000);
  const [desc, setDesc] = useState("");

  const handleAuthorInput = (e, index) => {
    const { name, value } = e.target;
    const tempAuthors = [...authors];
    tempAuthors[index][name] = value;
    setAuthors(tempAuthors);
  };

  const handleRemove = (index) => {
    const tempAuthors = [...authors];
    tempAuthors.splice(index, 1);
    setAuthors(tempAuthors);
  };

  const handleAdd = () => {
    setAuthors([...authors, { name: "", last_name: "" }]);
  };

  const addBook = () => {
    axios.post("http://localhost:3001/create", {
      title,
      authors,
      images,
      genre,
      maxOrder,
      price,
      publisher,
      language,
      year,
      desc
    });
  };

  return (
    <main>
      <Wrapper>
        <div className="info">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="authors">Authors:</label>
          <div className="authors" name="authors" id="authors">
            {authors.map((x, i) => {
              return (
                <div className="single-author">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={x.name}
                    onChange={(e) => handleAuthorInput(e, i)}
                    placeholder="name"
                  />
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={x.last_name}
                    onChange={(e) => handleAuthorInput(e, i)}
                    placeholder="last name"
                  />
                  <div className="list-com">
                    {authors.length !== 1 && (
                      <button className="btn" onClick={() => handleRemove(i)}>
                        Remove
                      </button>
                    )}
                    {authors.length - 1 === i && (
                      <button className="btn" onClick={handleAdd}>
                        Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            <div>{JSON.stringify(authors)}</div>
          </div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            name="genre"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <label htmlFor="publisher">Publisher:</label>
          <input
            type="text"
            name="publisher"
            id="publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
          <label htmlFor="language">Language:</label>
          <input
            type="text"
            name="language"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <label htmlFor="images">Images:</label>
          <input
            type="text"
            name="images"
            id="images"
            value={images}
            onChange={(e) => setImages(e.target.value)}
          />
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            name="year"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <label htmlFor="maxOrder">Maximum amount to order:</label>
          <input
            type="number"
            name="maxOrder"
            id="maxOrder"
            value={maxOrder}
            onChange={(e) => setMaxOrder(e.target.value)}
          />
          <label htmlFor="title">Description:</label>
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            onChange={(e) => setDesc(e.target.value)}
          >
            {desc}
          </textarea>
          <button onClick={addBook}>Add book</button>
        </div>
      </Wrapper>
    </main>
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
  .authors {
    width: 100%;
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
`;

export default AddBook;
