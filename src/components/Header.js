import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__board">
        <p className="header__user-info">email@mail.com</p>
        <Link to="/register" className="header__link transition-on-hover">Выйти</Link>
      </div>
    </header>
  );
};

export default Header;