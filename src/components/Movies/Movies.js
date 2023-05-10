import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import { GlobalContext } from '../../contexts/contexts';
import { getLocalItem } from '../../utils/utils';
import './Movies.css';

export default function Movies() {

  const { isMakingRequest, findMovies, attachLikes } = React.useContext(GlobalContext);
  const [response, setResponse] = React.useState({ message: '' });
  const [movies, setMovies] = React.useState(
    () => attachLikes(getLocalItem('movies'))
  );

  const { requestText, filterShort } = React.useMemo(() =>
    getLocalItem('movies-search') || { requestText: '', filterShort: false }
  , []);

  function beginSearch(requestText, filterShort) {
    findMovies(requestText, filterShort, setMovies, setResponse);
  }

  const serverError = response.type === 'error' ? ' error' : '';

  return (
    <div className="movies">
      <Header />
      <main className="movies__main">
        <SearchForm {...{requestText, filterShort, isMakingRequest, areSaved: false}}
          onSubmit={beginSearch} />
        {isMakingRequest ? <Preloader className="movies__preloader" />
          : movies.length ?
            <MoviesCardList {...{movies, setMovies}} />
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
