import styled from "styled-components";

export const ImageSelectModalContainer = styled.div`
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
    max-width: 80%;
    border-radius: 0.3rem;
  }
  .body {
    padding: 15px;
    border-top: 1px solid var(--main-color);
    border-bottom: 1px solid var(--main-color);
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    max-height: 70vh;
    position: relative;
    overflow-y: scroll;
  }

  .modal-thumb {
    max-width: 150px;
    max-height: 150px;
    clip: inherit;
  }
  .image-btn {
    width: 200px;
    height: 200px;
    overflow: hidden;
    margin: 1rem;
    background-color: rgba(0, 0, 0, 0.3);
    outline: none;
    border: none;
    cursor: pointer;
    border-radius: 0.5rem;
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
