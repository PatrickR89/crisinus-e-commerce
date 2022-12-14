import styled from "styled-components";

export const PropertiesModalContainer = styled.div`
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
