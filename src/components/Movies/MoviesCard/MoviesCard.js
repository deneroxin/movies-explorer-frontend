import React from 'react';
import { Link } from 'react-router-dom';
import { time } from '../../../constants/constants';
import './MoviesCard.css';

export default function MoviesCard({ cardData, onLike, handleInvokeDescription }) {

  const cardElement = React.useRef(null);

  const hours = Math.floor(cardData.duration / time.MINUTES_IN_AN_HOUR);
  const minutes = cardData.duration % time.MINUTES_IN_AN_HOUR;

  function playEffect(actionAfterEffect) {
    cardElement.current.classList.add('removed');
    const style = window.getComputedStyle(cardElement.current);
    const delay = parseFloat(style.getPropertyValue('transition-duration')) * time.MS_IN_A_SECOND;
    setTimeout(actionAfterEffect, delay);
  }

  function handleLikeClick() {
    onLike(cardData, playEffect);
  }

  function handleTitleClick() {
    handleInvokeDescription(cardData);
  }

  const buttonClass = cardData.isLiked !== undefined
    ? `movies-card__like${cardData.isLiked ? ' active' : ''}`
    : 'movies-card__remove';

  return (
    <li className="movies-card" ref={cardElement}>
      <Link to={cardData.trailerLink} className="movies-card__trailer-link" target="_blank">
        <img className="movies-card__image interactive"
          src={cardData.image} alt={cardData.nameRU}/>
      </Link>
      <div className="movies-card__title-container">
        <h2 className="movies-card__title interactive" onClick={handleTitleClick}>{cardData.nameRU}</h2>
        <button className={`${buttonClass} interactive-type-2`}
          onClick={handleLikeClick}
          aria-label="Поставить лайк"/>
      </div>
      <p className="movies-card__duration">
        {`${hours ? `${hours} ч. ` : ''}${minutes} мин.`}
      </p>
    </li>
  );
}
