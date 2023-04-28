import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import AccountLinkUnion from '../AccountLinkUnion/AccountLinkUnion';

export default function Navigation({ isActive, onClose }) {

  function handlePopupClick(evt) {
    if (evt.target === evt.currentTarget
      || evt.target.classList.contains('interactive')
      || evt.target.classList.contains('interactive_type_2')) onClose();
  }

  return (
    <div className={`navigation${isActive ? ' visible' : ''}`} onClick={handlePopupClick}>
      <nav className="navigation__panel">
        <NavLink className="navigation__link interactive" to="/">
          Главная
        </NavLink>
        <NavLink className="navigation__link interactive" to="/movies">
          Фильмы
        </NavLink>
        <NavLink className="navigation__link interactive" to="/saved-movies">
          Сохранённые фильмы
        </NavLink>
        <AccountLinkUnion className="navigation__account-link" />
      </nav>
      <button className="navigation__close interactive" aria-label="Закрыть меню" />
    </div>
  )
}
