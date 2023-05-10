import React from 'react';
import { Link } from 'react-router-dom';
import { addr } from '../../../constants/constants';
import { CardListContext, GlobalContext } from '../../../contexts/contexts';
import './MoviesCard.css';

export default function MoviesCard({ cardData, setMovies, hasLike }) {

  const handleInvokeDescription = React.useContext(CardListContext);
  const { handlePutLike, handleRemoveLike } = React.useContext(GlobalContext);

  const cardElement = React.useRef(null);

  const hours = Math.floor(cardData.duration / 60);
  const minutes = cardData.duration % 60;

  function playEffect(actionAfterEffect) {
    cardElement.current.classList.add('removed');
    const style = window.getComputedStyle(cardElement.current);
    const delay = parseFloat(style.getPropertyValue('transition-duration')) * 1000;
    setTimeout(actionAfterEffect, delay);
  }

  function handleLikeClick() {
    if (hasLike && !cardData.isLiked) {
      handlePutLike(cardData, setMovies);
    } else {
      handleRemoveLike(cardData.movieId, setMovies, hasLike, playEffect);
    }
  }

  function handleTitleClick() {
    handleInvokeDescription(cardData);
  }

  const imageUrl = hasLike
    ? new URL(cardData.image, addr.beatfilmMoviesBase)
    : cardData.image;

  const buttonClass = hasLike
    ? `movies-card__like${cardData.isLiked ? ' active' : ''}`
    : 'movies-card__remove';

  return (
    <li className="movies-card" ref={cardElement}>
      <Link to={cardData.trailerLink} className="movies-card__trailer-link" target="_blank">
        <img className="movies-card__image interactive"
          src={imageUrl} alt={cardData.nameRU}/>
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
