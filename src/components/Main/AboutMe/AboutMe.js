import React from 'react';
import { Link } from 'react-router-dom';
import './AboutMe.css';
import photo from './about-me__photo.jpg';

export default function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title section-title">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__info">
          <h3 className="about-me__name">Денис</h3>
          <p className="about-me__description">
            Фронтенд-разработчик, 41 год.
          </p>
          <p className="about-me__text">
            Родился и проживаю в городе Армавире.
            Окончил педагогический институт по специальности учитель математики и информатики.
            Программированием увлекаюсь с детства, со времён ZX-Spectrum.
            Чтобы вынести своё до сих пор любительское увлечение на профессиональный
            уровень, я записался на курсы Яндекс-Практикума,
            выбрав специальность веб-разработчика.
          </p>
        </div>
        <img className="about-me__photo" src={photo} alt="Денис" />
        <Link className="about-me__github-link interactive" target="_blank"
          to="https://github.com/deneroxin">GitHub</Link>
      </div>
    </section>
  );
}
