import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Description from './Description/Description';
import { useGetStyleProperties } from '../../../utils/customHooks';
import { CardListContext } from '../../../contexts/contexts';
import './MoviesCardList.css';

export default function MoviesCardList({ movies, onLike, areSaved }) {

  const hasMoreButton = !areSaved;

  const containerElement = React.useRef(null);
  const numInitialCards = React.useRef(0);
  const numAddedCards = React.useRef(0);
  const wereCardsAdded = React.useRef(false);
  const [numCards, setNumCards] = React.useState(0);

  useGetStyleProperties([
    [ containerElement, '--num-initial-cards', setInitialCards ],
    [ containerElement, '--num-added-cards', (value) => numAddedCards.current = parseInt(value) ],
  ]);

  const moviesSliced = hasMoreButton ? movies.slice(0, numCards) : movies;

  const [isDescriptionActive, setIsDescriptionActive] = React.useState(false);
  const descriptionTarget = React.useRef(null);

  function handleInvokeDescription(cardData) {
    descriptionTarget.current = cardData;
    setIsDescriptionActive(true);
  }

  function setInitialCards(value) {
    numInitialCards.current = parseInt(value);
    if (wereCardsAdded.current) {
      setNumCards((prev) => Math.max(prev, numInitialCards.current));
    } else {
      setNumCards(numInitialCards.current);
    }
  }

  function handleMoreClick() {
    wereCardsAdded.current = true;
    setNumCards((prev) => {
      let n = numAddedCards.current;
      // Если после добавления до конца остаётся меньше,
      // чем мы обычно добавляем, то добиваем уже до конца:
      if (prev + 2*n > movies.length) return movies.length;
      const r = prev % n;  // если торчит висящая карточка,
      if (r) n += n - r;  // увеличиваем n, чтобы добить неполный ряд и добавить новый.
      return Math.min(movies.length, prev + n);
    });
  }

  return (
    <div className="movies-card-list">
      <CardListContext.Provider value={{handleInvokeDescription, onLike}}>
        <ul className="movies-card-list__container" ref={containerElement}>
          {moviesSliced.map((card) => <MoviesCard
            key={card.movieId} cardData={card}
          />)}
        </ul>
      </CardListContext.Provider>
      { hasMoreButton && numCards < movies.length &&
        <button className="movies-card-list__more-button interactive-type-2"
          onClick={handleMoreClick}>Ещё</button>}
      <Description
        isActive={isDescriptionActive}
        movieData={descriptionTarget.current}
        onClose={() => setIsDescriptionActive(false)}
      />
    </div>
  );
}
