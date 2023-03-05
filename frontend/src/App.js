import './App.css';

import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import AuthService from "./services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const LoginSquare = (props) => {
  // const { setCurrentPage } = props;
  //  const navigate = useNavigate()
  const form = useRef();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");


  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");

    AuthService.register(name, email, password).then(
      (response) => {
        console.log(JSON.stringify(response.data['data']['user']));
        setMessage(JSON.stringify(response.data['data']['user']));
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);

      }
    );
  };

  return (
    <body>
      <div class="container">
        <h3 class="center">會員註冊</h3>
        <input
          type="text"
          className="input"
          placeholder="姓名"
          name="name"
          value={name}
          onChange={onChangeName}
          validations={[required]}
        />
        <input
          type="text"
          className="input"
          placeholder="電子郵件"
          name="email"
          value={email}
          onChange={onChangeEmail}
          validations={[required]}
        />
        <input
          type="password"
          className="input"
          placeholder="密碼"
          name="password"
          value={password}
          onChange={onChangePassword}
          validations={[required]}
        />
        <form ref={form} onSubmit={handleRegister}> {/*註冊*/}
          {/* {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )} */}
          <button>Register</button>
          <div className="span.psw" role="alert">
            {message}
          </div>
        </form>
      </div>
    </body>
  );
};

export default LoginSquare;