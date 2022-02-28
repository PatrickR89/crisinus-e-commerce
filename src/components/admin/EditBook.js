import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { FaCameraRetro } from "react-icons/fa";

const EditBook = () => {
  const { id } = useParams();

  const [initialBook, setInitialBook] = useState({
    title: "",
    authors: [],
    genre: "",
    max_order: 0,
    price: 0,
    publisher: "",
    language: "",
    year: 0,
    description: "",
    images: []
  });
  const [initialAuthors, setInitialAuthors] = useState([]);
  const [authors, setAuthors] = useState([{ name: "", last_name: "" }]);

  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [genre, setGenre] = useState("");
  const [maxOrder, setMaxOrder] = useState(0);
  const [price, setPrice] = useState(0);
  const [publisher, setPublisher] = useState("");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState(2000);
  const [desc, setDesc] = useState("");
  const [bookId, setBookId] = useState("");
  const [authorsList, setAuthorsList] = useState([]);

  const initializeBook = () => {
    setTitle(initialBook.title);
    setGenre(initialBook.genre);
    setMaxOrder(initialBook.max_order);
    setPrice(initialBook.price);
    setPublisher(initialBook.publisher);
    setLanguage(initialBook.language);
    setYear(initialBook.year);
    setDesc(initialBook.description);
    setImages(initialBook.images);
    setBookId(initialBook.id);
  };

  const loadAuthors = () => {
    axios.get("http://localhost:3001/books/authorList").then((response) => {
      setAuthorsList(response.data);
    });
  };

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

  const getData = (id) => {
    axios
      .post(`http://localhost:3001/books/singlebook`, { id })
      .then((response) => {
        setInitialBook(response.data[0]);
        setInitialAuthors(response.data[1]);
        console.log(response.data);
      });
  };

  const initializeAuthors = () => {
    const tempAL = [];
    initialAuthors.map((initAuthor) => {
      const tempAut = {
        name: initAuthor.name,
        last_name: initAuthor.last_name
      };
      tempAL.push(tempAut);
    });
    setAuthors(tempAL);
  };

  const handleImages = (e) => {
    const data = new FormData();
    const files = [...e.target.files];
    files.forEach((file) => {
      data.append("images", file);
      console.log(file);
    });
    setImages([...images, data]);
    console.log(images);
  };

  const editBook = () => {
    axios.post("http://localhost:3001/books/editbook", {
      title,
      genre,
      maxOrder,
      price,
      publisher,
      language,
      year,
      desc,
      bookId,
      authors
    });
  };

  useEffect(() => {
    getData(id);
    loadAuthors();
  }, []);
  useEffect(() => {
    initializeAuthors();
  }, [initialAuthors]);
  useEffect(() => {
    initializeBook();
  }, [initialBook]);

  return (
    <main>
      <Wrapper>
        <div>
          <h4>{initialBook.title}</h4>
          {initialBook.images.map((url, index) => {
            return (
              <div key={index}>
                <p>{url}</p>
                <img src={`http://localhost:3001/${url}`} alt="" />
              </div>
            );
          })}
        </div>

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
                    list="authorsNames"
                  />
                  <datalist id="authorsNames">
                    {authorsList.map((author) => {
                      return <option value={author.name}>{author.name}</option>;
                    })}
                  </datalist>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={x.last_name}
                    onChange={(e) => handleAuthorInput(e, i)}
                    placeholder="last name"
                    list="autLast"
                  />
                  <datalist id="autLast">
                    {authorsList.map((author) => {
                      return (
                        <option value={author.last_name}>
                          {author.last_name}
                        </option>
                      );
                    })}
                  </datalist>
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
          <label htmlFor="images" className="photo-input">
            Images:
            <input
              type="file"
              name="images"
              multiple
              id="images"
              className="hidden-input"
              onChange={handleImages}
            />
            <article className="btn">
              <FaCameraRetro className="icon-large" /> Add image
            </article>
          </label>
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
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button onClick={editBook} className="btn mt-1">
            Edit book
          </button>
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
`;

export default EditBook;
