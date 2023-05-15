import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GlobalContext } from '../../contexts/contexts';
import './Header.css';
import AccountLinkUnion from '../AccountLinkUnion/AccountLinkUnion';

export default function Header({ promoStyle = false }) {

  const { openNav } = React.useContext(GlobalContext);
  const promoPalette = promoStyle ? ' promo-style' : '';

  return (
    <header className={`header${promoPalette}`}>
      <Link className="header__logo site-logo interactive-type-2" to="/" />
      <nav className="header__nav">
        <NavLink className="header__link interactive" to="/movies">
          Фильмы
        </NavLink>
        <NavLink className="header__link header__link_saved-films interactive" to="/saved-movies">
          Сохранённые фильмы
        </NavLink>
        <AccountLinkUnion className="header__account-link" />
      </nav>
      <button className="header__burger interactive"
        onClick={openNav} aria-label="Открыть меню" />
    </header>
  );
}
