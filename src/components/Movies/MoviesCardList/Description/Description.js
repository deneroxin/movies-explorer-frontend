import React from 'react';
import './Description.css';

export default function Description({ isActive, movieData, onClose }) {

  function handleClose(evt) {
    if (evt.target === evt.currentTarget) onClose();
  }

  if (!movieData) return null;

  return (
    <div className={`description${isActive ? ' visible' : ''}`} onClick={handleClose}>
      <div className="description__pane">
        <p className="description__year">{movieData.year}</p>
        <button className="description__close interactive-type-2"
          onClick={handleClose} aria-label="Закрыть описание" />
        <h2 className="description__title">{movieData.nameRU}</h2>
        <p className="description__title-en">{movieData.nameEN}</p>
        <p className="description__director-label">Режиссёр:</p>
        <p className="description__director">{movieData.director}</p>
        <p className="description__text">{movieData.description}</p>
      </div>
    </div>
  );
}
