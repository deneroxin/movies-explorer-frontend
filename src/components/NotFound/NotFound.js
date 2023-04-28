import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {

  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found__error">
        <h1 className="not-found__error-code">404</h1>
        <p className="not-found__description">
          Страница не найдена
        </p>
      </div>
      <button className="not-found__link interactive_type_2"
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
    </div>
  );
}
