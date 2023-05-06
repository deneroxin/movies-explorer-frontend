import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <Link className="portfolio__text-link interactive" target="_blank"
            to="https://github.com/deneroxin/how-to-learn"
          >
            Страничный сайт
          </Link>
          <Link className="portfolio__arrow-link interactive" target="_blank"
            to="https://deneroxin.github.io/how-to-learn/"
          >
            ↗
          </Link>
        </li>
        <li className="portfolio__item">
          <Link className="portfolio__text-link interactive" target="_blank"
            to="https://github.com/deneroxin/russian-travel"
          >
            Адаптивный сайт
          </Link>
          <Link className="portfolio__arrow-link interactive" target="_blank"
            to="https://deneroxin.github.io/russian-travel/"
          >
            ↗
          </Link>
        </li>
        <li className="portfolio__item">
          <Link className="portfolio__text-link interactive" target="_blank"
            to="https://github.com/deneroxin/react-mesto-api-full-gha"
          >
            Одностраничное приложение
          </Link>
          <Link className="portfolio__arrow-link interactive" target="_blank"
            to="https://mesto.deneroxin.nomoredomains.work"
          >
            ↗
          </Link>
        </li>
      </ul>
    </div>
  );
}
