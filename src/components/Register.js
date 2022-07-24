import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({
      email,
      password
    });
  }

  return (
    <div className="auth">
      <p className="auth__title">Регистрация</p>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          id="username"
          required
          placeholder="Email"
          name="username"
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
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
        <button
          className="auth__button transition-on-hover"
          type="submit"
        >Зарегистрироваться
        </button>
          <Link to="sign-in" className="auth__signin-link transition-on-hover">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  );
};

export default Register;