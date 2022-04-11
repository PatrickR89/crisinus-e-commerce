import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa";

const EditAuthor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialAuthor, setInitialAuthor] = useState({
    name: "",
    last_name: "",
    url: "",
    img: [],
    bio: ""
  });

  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState("");
  const [bio, setBio] = useState("");

  const initializeAuthor = () => {
    setName(initialAuthor.name);
    setLast_name(initialAuthor.last_name);
    if (initialAuthor.img !== null && initialAuthor.img !== undefined) {
      console.log(initialAuthor.img);
      setImages(initialAuthor.img);
    }
    if (initialAuthor.url !== null) {
      setUrl(initialAuthor.url);
    }
    if (initialAuthor.bio !== null) {
      setBio(initialAuthor.bio);
    }
  };

  const getAuthor = () => {
    axios
      .post("http://localhost:3001/authors/getauthor", { id })
      .then((response) => {
        setInitialAuthor(response.data[0]);
      });
  };

  const handleAddImages = (e) => {
    const data = new FormData();
    const files = [...e.target.files];
    files.forEach((file) => {
      data.append("images", file);
    });

    axios.post("http://localhost:3001/images/addimages", data).then((res) => {
      console.log(res.data);
      const tempImages = [...images];
      res.data.forEach((image) => {
        console.log(image);
        tempImages.push(image.path);
      });
      console.log(tempImages);
      setImages(tempImages);
    });
  };

  const handleDeleteImage = (url) => {
    axios.post("http://localhost:3001/images/deleteimages", { url });
    const tempUrls = images.filter((image) => image !== url);
    setImages(tempUrls);
  };

  const handleEdit = () => {
    axios.put("http://localhost:3001/authors/editauthor", {
      id,
      name,
      last_name,
      images,
      url,
      bio
    });
  };
  const handleDelete = () => {
    axios.delete("http://localhost:3001/authors/deleteauthor", {
      data: { id: id }
    });
    navigate("/admin/authorslist", { replace: true });
  };

  useEffect(() => {
    getAuthor();
  }, []);
  useEffect(() => {
    initializeAuthor();
  }, [initialAuthor]);
  return (
    <Wrapper>
      <div className="thumb-container">
        {images &&
          images.map((url, index) => {
            return (
              <div key={index} className="single-thumb">
                <p>{url}</p>
                <img
                  className="thumb"
                  src={`http://localhost:3001/${url}`}
                  alt=""
                />
                <button
                  className="btn btn-delete"
                  onClick={() => handleDeleteImage(url)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            );
          })}
      </div>
      <div className="info">
        <label htmlFor="images" className="photo-input">
          Images:
          <input
            type="file"
            name="images"
            multiple
            id="images"
            className="hidden-input"
            onChange={handleAddImages}
          />
          <article className="btn">
            <FaCameraRetro className="icon-large" /> Add image
          </article>
        </label>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="last_name">Last name:</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
        />
        <label htmlFor="url">Url:</label>
        <input
          type="text"
          name="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <label htmlFor="bio">Bio:</label>
        <textarea
          name="bio"
          id="bio"
          cols="30"
          rows="10"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <div className="edit-container">
          <button onClick={handleEdit} className="btn mt-1">
            Edit author
          </button>
          <button className="btn mt-1 btn-delete" onClick={handleDelete}>
            DELETE author
          </button>
        </div>
      </div>
    </Wrapper>
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

export default EditAuthor;