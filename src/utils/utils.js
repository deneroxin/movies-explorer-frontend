import { addr } from '../constants/constants';

export function setLocalItem(name, object) {
  localStorage.setItem(name, JSON.stringify(object));
}

export function getLocalItem(name) {
  const item = localStorage.getItem(name);
  return (item ? JSON.parse(item) : undefined);
}

export function expandUrl(movie) {
  return {
    ...movie,
    image: `${addr.beatfilmMoviesBase}${movie.image}`,
    thumbnail: `${addr.beatfilmMoviesBase}${movie.thumbnail}`
  }
}
