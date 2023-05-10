import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Preloader from '../Movies/Preloader/Preloader';
import { GlobalContext } from '../../contexts/contexts';
import { getLocalItem } from '../../utils/utils';
import '../Movies/Movies.css';

export default function SavedMovies() {

  const { isMakingRequest, findSavedMovies } = React.useContext(GlobalContext);
  const [response, setResponse] = React.useState({ message: '' });
  const [foundMovies, setFoundMovies] = React.useState([]);

  const { requestText, filterShort } = React.useMemo(() =>
    getLocalItem('saved-movies-search') || { requestText: '', filterShort: false }
  , []);

  React.useEffect(() => beginSearch(requestText, filterShort), []);

  function beginSearch(requestText, filterShort) {
    findSavedMovies(requestText, filterShort, setFoundMovies, setResponse);
  }

  const serverError = response.type === 'error' ? ' error' : '';

  return (
    <div className="movies">
      <Header />
      <main className="movies__main">
        <SearchForm {...{requestText, filterShort, isMakingRequest, areSaved: true}}
          onSubmit={beginSearch} />
        {isMakingRequest ? <Preloader className="movies__preloader" />
          : foundMovies.length ?
            <MoviesCardList movies={foundMovies} setMovies={setFoundMovies} areSaved />
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
