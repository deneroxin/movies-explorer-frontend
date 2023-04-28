import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AccountLinkUnion.css';

export default function AccountLinkUnion({ className }) {
  return (
    <div className={`account-link-union ${className}`}>
      <NavLink className="account-link-union__text-link interactive" to="/profile">
        Аккаунт
      </NavLink>
      <Link className="account-link-union__icon-link interactive_type_2"
        tabIndex="-1" to="/profile"
      />
    </div>
  )
}
