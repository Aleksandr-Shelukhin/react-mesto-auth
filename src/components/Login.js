import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import '../index.css'

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  return (
    <div className="auth">
      <p className="auth__header"></p>
      <form className="auth__form">
        <input
          className="auth__input"
          id="username"
          required
          placeholder="Email"
          name="username"
          type="text"
          value={userName}
          onChange={({ target }) => setUserName(target.value)}
        />
        <input
          className="auth__input"
          id="password"
          required
          placeholder="Пароль"
          name="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button className="auth__Button">Войти</button>

      </form>
    </div>
  );
};

export default Login;