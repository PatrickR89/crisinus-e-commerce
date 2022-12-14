import React, { useState, useEffect } from "react";
import axios from "axios";

import { useAuthenticationContext } from "../../../contexts/authentication_context";
import { useErrorReport } from "../../../hooks/useErrorReport";
import { PropertiesModalContainer } from "./PropertiesModalContainer";

const DimensionsModal = ({ closeModal, item }) => {
  const errorReport = useErrorReport();
  const { header } = useAuthenticationContext();
  const [properties, setProperties] = useState({
    id: item.id,
    cover: "null",
    pages: 0
  });

  const [isEdit, setIsEdit] = useState(false);

  function updateProperties() {
    if (isEdit) {
      axios({
        url: `/api/bookprops/${item.product_id}`,
        method: "put",
        headers: header(),
        data: { properties: properties }
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
            `/api/bookprops/${item.id}`,
            window.location.pathname,
            "put"
          );
        });
    } else {
      axios({
        url: `/api/bookprops`,
        method: "post",
        headers: header(),
        data: { properties: properties }
      })
        .then((response) => {
          const info = `"${item.name}" dimension added`;
          axios.post("/api/system/info", { info });
          return;
        })
        .catch((error) => {
          errorReport(
            error,
            `/api/bookprops`,
            window.location.pathname,
            "post"
          );
        });
    }
  }

  function updateValue(e) {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);

    setProperties({ ...properties, [name]: value });
  }

  useEffect(() => {
    axios({
      url: `/api/bookprops/${item.id}`,
      method: "post",
      headers: header(),
      data: { id: item.id }
    })
      .then((response) => {
        if (response.data[0] === undefined) {
          setIsEdit(false);
        } else {
          setIsEdit(true);
          setProperties(response.data[0]);
        }
      })
      .catch((error) => {
        errorReport(
          error,
          `/api/bookprops/${item.id}`,
          window.location.pathname,
          "post"
        );
      });

    return () => {
      setProperties({
        product_id: 0,
        width: 0,
        height: 0,
        depth: 0,
        weight: 0
      });
    };
  }, [item]);

  return (
    <PropertiesModalContainer>
      <div className="content glass">
        <div className="header">
          <h2>Dimenzije za: {item.name}</h2>
        </div>
        <p>{item.id}</p>
        <div className="body">
          <div className="distancer">
            <label htmlFor="cover">Uvez:</label>
            <select
              name="cover"
              id="cover"
              className="glass"
              onChange={updateValue}
              value={properties.cover}
            >
              <option value="NULL">Nema</option>
              <option value="HARDCOVER">Tvrdi</option>
              <option value="PAPERBACK">Mekani</option>
            </select>
            {/* <input
              value={properties.width}
              type="number"
              name="width"
              id="width"
              className="glass"
              onChange={updateValue}
            /> */}
            <label htmlFor="pages">Broj stranica:</label>
            <input
              value={properties.pages}
              type="number"
              name="pages"
              id="pages"
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
              updateProperties();
              closeModal();
            }}
          >
            Spremi
          </button>
        </div>
      </div>
    </PropertiesModalContainer>
  );
};

export default DimensionsModal;
