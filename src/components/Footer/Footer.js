import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <section className="footer">
      <p className="footer__subscript">
        Учебный проект Яндекс.Практикум x BeatFilm.
      </p>
      <span className='footer__copyright'>&copy;&nbsp;2020</span>
      <ul className="footer__links">
        <Link className="footer__link interactive" target="_blank"
          to="https://practicum.yandex.ru/profile/web/">Яндекс.Практикум</Link>
        <Link className="footer__link interactive" target="_blank"
          to="https://github.com/deneroxin">GitHub</Link>
      </ul>
    </section>
  );
}
