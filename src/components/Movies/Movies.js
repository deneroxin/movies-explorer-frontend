import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { moviesData } from './moviesData';
import './Movies.css';

export default function Movies() {
  return (
    <div className="movies">
      <Header />
      <main>
        <SearchForm />
        <MoviesCardList {...{moviesData}} areSaved={false} />
      </main>
      <Footer />
    </div>
  );
}
