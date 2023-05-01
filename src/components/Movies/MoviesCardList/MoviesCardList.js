import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useGetStyleProperties } from '../../../utils/customHooks';
import './MoviesCardList.css';

export default function MoviesCardList({ moviesData, areSaved }) {

  const containerElement = React.useRef(null);
  const [numCards, setNumCards] = React.useState(0);
  const numAddedCards = React.useRef(0);

  useGetStyleProperties([
    [ containerElement, '--num-initial-cards', (value) => setNumCards(parseInt(value)) ],
    [ containerElement, '--num-added-cards', (value) => numAddedCards.current = parseInt(value) ],
  ]);

  function handleMoreClick() {

  }

  return (
    <div className="movies-card-list">
      <ul className="movies-card-list__container" ref={containerElement}>
        {moviesData.slice(0, numCards).map((card, i) =>
          (<MoviesCard key={i} hasLike={!areSaved} cardData={card}/>))}
      </ul>
      {!areSaved && <button className="movies-card-list__more-button interactive-type-2"
        onClick={handleMoreClick}>Ещё</button>}
    </div>
  );
}
