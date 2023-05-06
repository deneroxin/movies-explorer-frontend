import React from 'react';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title section-title">О проекте</h2>
      <div className="about-project__content">
        <h3 className="about-project__subtitle">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="about-project__text">
          Составление плана, работу над бэкендом, вёрстку,
          добавление функциональности и финальные доработки.
        </p>
        <h3 className="about-project__subtitle">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="about-project__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые
          нужно было соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about-project__chart">
        <span className="about-project__chart-segment">1 неделя</span>
        <span className="about-project__chart-label">Back-end</span>
        <span className="about-project__chart-segment">4 недели</span>
        <span className="about-project__chart-label">Front-end</span>
      </div>
    </section>
  );
}
