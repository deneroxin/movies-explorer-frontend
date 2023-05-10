import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Preloader from '../Movies/Preloader/Preloader';
import { GlobalContext } from '../../contexts/contexts';
import { setLocalItem, getLocalItem, getErrorMessage } from '../../utils/utils';
import { filterMovies } from '../../utils/filterMovies';
import { api } from '../../utils/MainApi';
import { msg } from '../../constants/constants';
import '../Movies/Movies.css';

export default function SavedMovies() {

  const { isMakingRequest, savedMovies, setSavedMovies } = React.useContext(GlobalContext);
  const [response, setResponse] = React.useState({ message: '' });
  const [foundMovies, setFoundMovies] = React.useState([]);

  const { requestText, filterShort } = React.useMemo(() =>
    getLocalItem('saved-movies-search') || { requestText: '', filterShort: false }
  , []);

  React.useEffect(() => findMovies(requestText, filterShort), []);

  function findMovies(requestText, filterShort) {
    setLocalItem('saved-movies-search', { requestText, filterShort });
    const foundMovies = filterMovies(savedMovies, requestText, filterShort);
    if (!foundMovies.length) {
      setResponse({ type: 'report', message: msg.NOTHING_FOUND });
    } else {
      setResponse({ message: '' });
    }
    setFoundMovies(foundMovies);
  }

  function onLike({ movieId }, playEffect) {
    const { _id } = savedMovies.find((movie) => movie.movieId === movieId);
    api.removeMovie(_id)
      .then(() => {
        const deleteMovie = (prevData) => prevData.filter((movie) => movie._id !== _id);
        setSavedMovies(deleteMovie);
        playEffect(() => setFoundMovies(deleteMovie));
      })
      .catch((err) => {
        console.log(getErrorMessage(err));
      })
  }

  const serverError = response.type === 'error' ? ' error' : '';

  return (
    <div className="movies">
      <Header />
      <main className="movies__main">
        <SearchForm {...{findMovies, requestText, filterShort,
          isMakingRequest, areSaved: true}} />
        {isMakingRequest ? <Preloader className="movies__preloader" />
          : foundMovies.length ?
            <MoviesCardList movies={foundMovies} {...{onLike}} areSaved />
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
