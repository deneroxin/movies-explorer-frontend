import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import { GlobalContext } from '../../contexts/contexts';
import { setLocalItem, getLocalItem, setLike, getErrorMessage } from '../../utils/utils';
import { getMovies } from '../../utils/MoviesApi';
import { api } from '../../utils/MainApi';
import { filterMovies } from '../../utils/filterMovies';
import { msg } from '../../constants/constants';
import './Movies.css';

export default function Movies() {

  const { isMakingRequest, savedMovies, setSavedMovies,
    startRequest, stopRequest } = React.useContext(GlobalContext);
  const [response, setResponse] = React.useState({ message: '' });
  const [movies, setMovies] = React.useState(
    () => attachLikes(getLocalItem('movies'))
  );

  const { requestText, filterShort } = React.useMemo(() =>
    getLocalItem('movies-search') || { requestText: '', filterShort: false }
  , []);

  function isMovieLiked(id) {
    return Boolean(savedMovies.find(({ movieId }) => movieId === id));
  }

  function attachLikes(movieList) {
    if (!movieList) return [];
    return movieList.map((movie) => ({...movie, isLiked: isMovieLiked(movie.movieId)}));
  }

  function findMovies(requestText, filterShort) {
    startRequest(setResponse);
    setLocalItem('movies-search', { requestText, filterShort });
    getMovies()
      .then((allMovies) => {
        const filteredMovies = filterMovies(allMovies, requestText, filterShort);
        setLocalItem('movies', filteredMovies);
        setMovies(attachLikes(filteredMovies));
        if (!filteredMovies.length) {
          setResponse({ type: 'report', message: msg.NOTHING_FOUND });
        }
      })
      .catch(() => {
        setResponse({ type: 'error', message: msg.MOVIES_FETCH_FAIL });
      })
      .finally(stopRequest);
  }

  function putLike({ isLiked, ...movieData }) {
    api.addMovie(movieData)
      .then((movieDataEcho) => {
        setSavedMovies(savedMovies.concat(movieDataEcho));
        setMovies(setLike(movies, movieData.movieId, true));
      })
      .catch((err) => {
        console.log(getErrorMessage(err));
      })
  }

  function removeLike({ movieId }) {
    const { _id } = savedMovies.find((movie) => movie.movieId === movieId);
    api.removeMovie(_id)
      .then(() => {
        setSavedMovies(savedMovies.filter((movie) => movie._id !== _id));
        setMovies(setLike(movies, movieId, false));
      })
      .catch((err) => {
        console.log(getErrorMessage(err));
      })
  }

  function onLike(cardData) {
    if (!cardData.isLiked) putLike(cardData); else removeLike(cardData);
  }

  const serverError = response.type === 'error' ? ' error' : '';

  return (
    <div className="movies">
      <Header />
      <main className="movies__main">
        <SearchForm {...{findMovies, requestText, filterShort,
          isMakingRequest, areSaved: false}} />
        {isMakingRequest ? <Preloader className="movies__preloader" />
          : movies.length ?
            <MoviesCardList {...{movies, onLike}} />
            : <div className="movies__message-container">
                <span className={`movies__message${serverError}`}>
                  { response.message }
                </span>
              </div>
        }
      </main>
      <Footer />
    </div>
  );
}
