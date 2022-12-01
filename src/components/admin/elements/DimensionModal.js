import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useErrorReport } from "../../../hooks/useErrorReport";

const DimensionsModal = ({ closeModal, item }) => {
  const errorReport = useErrorReport();
  const { header } = useAuthenticationContext();
  const [dimensions, setDimensions] = useState({
    product_id: item.id,
    width: 0,
    height: 0,
    depth: 0,
    weight: 0
  });

  const [isEdit, setIsEdit] = useState(false);

  function updateDimension() {
    if (isEdit) {
      axios({
        url: `/api/productdimensions/${item.product_id}`,
        method: "put",
        headers: header(),
        data: { dimensions }
      })
        .then((response) => {
          if (response.data.changedRows > 0) {
            const info = `"${item.name}" dimension edited`;
            axios.post("/api/system/info", { info });
            return alert(`"${item.name}" updated!`);
          } else {
            return alert(`"${item.name}" failed to update!`);
          }
        })
        .catch((error) => {
          errorReport(
            error,
            `/api/productdimensions/${item.id}`,
            window.location.pathname,
            "put"
          );
        });
    } else {
      axios({
        url: `/api/productdimensions`,
        method: "post",
        headers: header(),
        data: { dimensions }
      })
        .then((response) => {
          const info = `"${item.name}" dimension added`;
          axios.post("/api/system/info", { info });
          return;
        })
        .catch((error) => {
          errorReport(
            error,
            `/api/productdimensions`,
            window.location.pathname,
            "post"
          );
        });
    }
  }

  function updateValue(e) {
    let name = e.target.name;
    let value = e.target.value;

    setDimensions({ ...dimensions, [name]: value });
  }

  useEffect(() => {
    axios({
      url: `/api/productdimensions/${item.id}`,
      method: "post",
      headers: header(),
      data: { id: item.id }
    })
      .then((response) => {
        if (response.data[0] === undefined) {
          setIsEdit(false);
        } else {
          setIsEdit(true);
          setDimensions(response.data[0]);
        }
      })
      .catch((error) => {
        errorReport(
          error,
          `/api/productdimensions/${item.id}`,
          window.location.pathname,
          "post"
        );
      });

    return () => {
      setDimensions({
        product_id: 0,
        width: 0,
        height: 0,
        depth: 0,
        weight: 0
      });
    };
  }, [item]);

  return (
    <Wrapper>
      <div className="content glass">
        <div className="header">
          <h2>Dimenzije za: {item.name}</h2>
        </div>
        <p>{item.id}</p>
        <div className="body">
          <div className="distancer">
            <label htmlFor="width">Širina (mm):</label>
            <input
              value={dimensions.width}
              type="number"
              name="width"
              id="width"
              className="glass"
              onChange={updateValue}
            />
            <label htmlFor="height">Visina (mm):</label>
            <input
              value={dimensions.height}
              type="number"
              name="height"
              id="height"
              className="glass"
              onChange={updateValue}
            />
            <label htmlFor="depth">Dubina/debljina (mm):</label>
            <input
              value={dimensions.depth}
              type="number"
              name="depth"
              id="depth"
              className="glass"
              onChange={updateValue}
            />
            <label htmlFor="weight">Težina (g):</label>
            <input
              value={dimensions.weight}
              type="number"
              name="weight"
              id="weight"
              className="glass"
              onChange={updateValue}
            />
          </div>
        </div>
        <div className="footer">
          <button className="btn" onClick={closeModal}>
            Zatvori
          </button>
          <button
            className="btn"
            onClick={() => {
              updateDimension();
              closeModal();
            }}
          >
            Spremi
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--clr-par-9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  .content {
    width: 600px;
    border-radius: 0.3rem;
  }
  .body {
    padding: 15px;
    border-top: 1px solid var(--main-color);
    border-bottom: 1px solid var(--main-color);
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    position: relative;

    .distancer {
      display: flex;
      flex-direction: column;
      position: relative;
      margin-top: 0.5rem;

      label {
        margin-bottom: 0.5rem;
        text-align: start;
        color: var(--clr-par-5);
      }
      input {
        border: none;
        border-radius: var(--radius);
        font-size: 1.5rem;
        color: var(--clr-par-5);
        background: var(--clr-button-1-tp) !important;
      }

      input:focus {
        outline: none;
        background: var(--clr-button-4-tp);
        color: var(--clr-par-5) !important;
      }

      input:hover {
        background: var(--clr-button-4-tp);
        color: var(--clr-par-5) !important;
      }

      input:-webkit-autofill,
      input:-webkit-autofill:focus {
        transition: background-color 600000s 0s, color 600000s 0s;
      }
      input[data-autocompleted] {
        background-color: transparent !important;
      }
    }
  }
  .glass {
    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(2px);
    margin-bottom: 1rem;
  }
  .header,
  .footer {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  }

  .footer {
    margin-bottom: 1rem;
  }

  @media (max-width: 900px) {
    .content {
      width: 70%;
    }
  }

  @media (max-width: 600px) {
    .content {
      width: 100%;
    }
  }
`;

export default DimensionsModal;
