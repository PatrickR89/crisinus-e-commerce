import React from "react";
import styled from "styled-components";

const CartModal = () => {
  return (
    <Wrapper>
      <div className="content glass">
        <div className="header">
          <h2>Purchase</h2>
        </div>
        <div className="body"></div>
        <div className="footer">
          <button className="btn">CLOSE</button>
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
  }
  .glass {
    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(2px);
  }
  .header,
  .footer {
    padding: 10px;
  }
`;

export default CartModal;
