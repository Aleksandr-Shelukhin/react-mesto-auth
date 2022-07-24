import React from 'react';
import {Link, Route} from "react-router-dom";

const Header = ({email, loggedIn, signOut}) => {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__board">
        {
          loggedIn
          ? <p className="header__user-info">{email}</p>
          :  ''
        }

        {
          loggedIn
            ? <p className="header__link transition-on-hover" onClick={signOut}>Выйти</p>
            : <Route><Link to='/sign-up' className="header__link">Регистрация</Link></Route>

        }

      </div>
    </header>
  );
};

export default Header;