import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const Login = ({onLogin} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({email, password})
      .then(
        () => {
          history.push('/');
        })
      .then(() => resetForm())
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="auth" onSubmit={handleSubmit}>
      <p className="auth__title">Вход</p>
      <form className="auth__form" >
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
        <button className="auth__button transition-on-hover">Войти</button>

      </form>
    </div>
  );
};

export default Login;