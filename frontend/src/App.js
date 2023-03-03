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
        setMessage(response.data.message);

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
    <div className="account_square">

      <div className="account_title">會員登入</div>
      <div className="input_position">
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
      </div>
      <div className="choose_button">
        <form ref={form} onSubmit={handleRegister}> {/*註冊*/}
          <button className="register_button">
            {/* {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )} */}
            <span>Register</span>
          </button>

          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
        </form>
      </div>

    </div>
  );
};

export default LoginSquare;






// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
