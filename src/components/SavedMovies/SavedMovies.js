import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import { moviesData } from '../Movies/moviesData';
import '../Movies/Movies.css';

export default function Movies() {
  return (
    <div className="movies">
      <Header />
      <SearchForm />
      <MoviesCardList {...{moviesData}} areSaved={true} />
      <Footer />
    </div>
  );
}
