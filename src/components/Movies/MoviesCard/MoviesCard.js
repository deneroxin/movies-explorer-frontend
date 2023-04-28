import React from 'react';
import './MoviesCard.css';

export default function MoviesCard({ hasLike, cardData }) {

  function handleLikeClick() {

  }

  return (
    <div className="movies-card">
      <img className="movies-card__image"
        src={cardData.thumbnail} alt={cardData.title}/>
      <div className="movies-card__title-container">
        <h2 className="movies-card__title">{cardData.title}</h2>
        <button className={`${hasLike ? `movies-card__like${Math.random() < 0.5 ? ' active' : ''}`
          : 'movies-card__remove'} interactive_type_2`}
          onClick={handleLikeClick}
          aria-label="Поставить лайк"/>
      </div>
      <p className="movies-card__duration">{cardData.duration}</p>
    </div>
  );
}
