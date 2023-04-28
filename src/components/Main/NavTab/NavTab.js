import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';

export default function NavTab() {

  return (
    <section className="nav-tab">
      <div className="nav-tab__logo site-logo" />
      <nav className="nav-tab__links">
        <Link className="nav-tab__signup interactive" to="/signup">Регистрация</Link>
        <Link className="nav-tab__signin interactive_type_2" to="/signin">Войти</Link>
      </nav>
    </section>
  );
}
