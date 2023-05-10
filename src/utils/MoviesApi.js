import { addr } from '../constants/constants';

function transform(movieData) {
  const {
    trailerLink, director, duration, description,
    year, country, nameRU, nameEN, id, image
  } = movieData;
  return {
    country, director, duration, description,
    year, trailerLink, nameRU, nameEN,
    image: image.url,
    thumbnail: image.formats.thumbnail.url,
    movieId: id
  };
}

export const getMovies = () =>
  fetch(`${addr.beatfilmMoviesBase}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then((res) => res.json().then((data) =>
    res.ok ? data.map(transform) : Promise.reject(data)));
