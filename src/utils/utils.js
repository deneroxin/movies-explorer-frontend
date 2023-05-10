export function setLocalItem(name, object) {
  localStorage.setItem(name, JSON.stringify(object));
}

export function getLocalItem(name) {
  const item = localStorage.getItem(name);
  return (item ? JSON.parse(item) : undefined);
}

export function setLike(movies, id, status) {
  return movies.map((movie) =>
    movie.movieId === id ? {...movie, isLiked: status} : movie);
}

export function getErrorMessage(err) {
  return (err.statusCode === 400 && err.validation && err.validation.body && err.validation.body.message)
    ? `${err.message}: ${err.validation.body.message}`
    : err.message;
}
