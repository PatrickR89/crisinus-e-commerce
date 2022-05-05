import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { useAuthenticationContext } from "../../contexts/authentication_context";

const Login = () => {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  axios.defaults.withCredentials = true;

  const { updateUser, login, logout, loggedIn, header } =
    useAuthenticationContext();

  const userAuthenticated = () => {
    axios
      .get("http://localhost:3001/authentication", {
        // headers: { "x-access-token": localStorage.getItem("token") }
        headers: header()
      })
      .then((response) => {
        console.log(response);
      });
  };

  const register = () => {
    axios
      .post("http://localhost:3001/register", {
        username: usernameReg,
        password: passwordReg
      })
      .then((response) => {});
  };

  return (
    <Wrapper>
      <div className="registration">
        <h2>Registration</h2>
        <label htmlFor="usernamereg">Username:</label>
        <input
          type="text"
          name="usernamereg"
          id="usernamereg"
          onChange={(e) => setUsernameReg(e.target.value)}
        />
        <label htmlFor="passwordreg">Password:</label>
        <input
          type="text"
          name="passwordreg"
          id="passwordreg"
          onChange={(e) => setPasswordReg(e.target.value)}
        />
        <button className="btn" onClick={register}>
          Register
        </button>
      </div>
      <div className="login">
        <h2>Login</h2>

        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username..."
          //   onChange={(e) => setUsername(e.target.value)}
          onChange={updateUser}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password..."
          //   onChange={(e) => setPassword(e.target.value)}
          onChange={updateUser}
        />
        <button className="btn" onClick={login}>
          Login
        </button>
        <button className="btn" onClick={logout}>
          Logout
        </button>
      </div>

      {loggedIn && (
        <button className="btn" onClick={userAuthenticated}>
          Check auth
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  flex-direction: column;
  width: 100%;

  .registration,
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;

    input {
      width: 50%;
      height: 2rem;
      font-size: 1.5rem;
      padding: 1.1rem;
      margin: 1rem;
    }

    label {
      font-size: 1.5rem;
    }

    button {
      margin: 1rem;
    }
  }
`;

export default Login;
