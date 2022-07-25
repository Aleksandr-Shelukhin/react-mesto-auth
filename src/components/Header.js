import React from 'react';
import {Link, Route} from "react-router-dom";

const Header = ({email, signOut}) => {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__board">
        <Route path='/sign-in'>
          <Link to='/sign-up' className="header__link">Регистрация</Link>
        </Route>
        <Route path='/sign-up'>
          <Link to='/sign-in' className="header__link">Вход</Link>
        </Route>
        <Route exact path='/'>
          <p className="header__user-info">{email}</p>
          <p className="header__link transition-on-hover" onClick={signOut}>Выйти</p>
          <button className="header__burger-button header__burger-button_close transition-on-hover"></button>
        </Route>
      </div>
    </header>
  );
};

export default Header;