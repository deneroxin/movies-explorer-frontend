import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext, GlobalContext } from '../../contexts/contexts';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Navigation from '../Navigation/Navigation';
import Protected from '../Protected/Protected';
import { getMovies } from '../../utils/MoviesApi';
import { filterMovies } from '../../utils/filterMovies';
import { msg } from '../../constants/constants';
import { api } from '../../utils/MainApi';
import { useCurrentPathRef } from '../../utils/customHooks';
import { setLocalItem, expandUrl } from '../../utils/utils';


export default function App() {

  // Пока пытаемся авторизоваться, чтоб не мелькала страница переадресации для защищённых компонентов:
  const [tryingToAuthorize, setTryingToAuthorize] = React.useState(true);
  // Информация о пользователе. Если null, то пользователь не авторизован:
  const [currentUser, setCurrentUser] = React.useState(null);
  // Фильмы пользователя нужны сразу на двух страницах: saved-movies и movies - чтобы правильно отображать лайки
  // поэтому savedMovies вынесено в App, и загрузка сохраненных фильмов тоже.
  const [savedMovies, setSavedMovies] = React.useState([]);

  React.useEffect(function tryToAuthorize() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      setTryingToAuthorize(false);
      return;
    }
    api.getUserInfo()
      .then(setCurrentUser)
      .then(loadSavedMovies)
      .catch((err) => {
        if (err.statusCode === 500) {
          console.log(err.message);
        } else {
          localStorage.removeItem('jwt');
        }
      })
      .finally(() => setTryingToAuthorize(false));
  }, []);

  // Общий для всех страниц признак того, что идёт запрос -
  // используется для индикации загрузки и блокировки повторного нажатия кнопок, когда запрос пошёл.
  const [isMakingRequest, setIsMakingRequest] = React.useState(false);

  const globalState = React.useMemo(() => ({
    tryingToAuthorize,
    isMakingRequest,
    openNav,
    findMovies,
    findSavedMovies,
    loadSavedMovies,
    handleRegisterSubmit,
    handleLoginSubmit,
    handleUpdateUserInfo,
    handleLogout,
    attachLikes,
    handlePutLike,
    handleRemoveLike,
  }), [tryingToAuthorize, isMakingRequest, savedMovies]);

  const [isNavActive, setNavActive] = React.useState(false);

  const navigate = useNavigate();
  const currentPathRef = useCurrentPathRef();

  function openNav() {
    setNavActive(true);
  }

  function closeNav() {
    setNavActive(false);
  }

  function startRequest(setResponse) {
    setResponse({ message: '' });
    setIsMakingRequest(() => true);
  }

  function stopRequest() {
    setIsMakingRequest(() => false);
  }

  function loadSavedMovies() {
    return api.getMovies().then(setSavedMovies)
  }

  function isMovieLiked(id) {
    return Boolean(savedMovies.find(({ movieId }) => movieId === id));
  }

  function attachLikes(movieList) {
    if (!movieList) return [];
    return movieList.map((movie) => ({...movie, isLiked: isMovieLiked(movie.movieId)}));
  }

  function getErrorMessage(err) {
    return (err.statusCode === 400 && err.validation && err.validation.body && err.validation.body.message)
      ? `${err.message}: ${err.validation.body.message}`
      : err.message;
  }

  function findMovies(requestText, filterShort, setMovies, setResponse) {
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

  function findSavedMovies(requestText, filterShort, setFoundMovies, setResponse) {
    setLocalItem('saved-movies-search', { requestText, filterShort });
    const foundMovies = filterMovies(savedMovies, requestText, filterShort);
    if (!foundMovies.length) {
      setResponse({ type: 'report', message: msg.NOTHING_FOUND });
    } else {
      setResponse({ message: '' });
    }
    setFoundMovies(foundMovies);
  }

  function handleRegisterSubmit(inputsData, setResponse) {
    startRequest(setResponse);
    api.createUser(inputsData)
      .then(() => {
        const { email, password } = inputsData;
        return login({ email, password })
          .then(() => {
            setResponse({ type: 'ok', message: msg.REGISTERED_AND_AUTHORIZED });
            setTimeout(() => {
              // Через 3 сек. переходим на страницу /movies, но только
              // если пользователь не успел сам перейти на другую страницу:
              if (currentPathRef.current === '/signup') navigate('/movies')
            }, 3000);
          })
          .catch((err) => setResponse({
            type: 'error',
            message: `${msg.REGISTERED_BUT_NOT_AUTHORIZED}: ${getErrorMessage(err)}`
          }));
      })
      .catch((err) => {
        setResponse({
          type: 'error',
          message: err.statusCode === 500 ? msg.REGISTER_FAIL : getErrorMessage(err)
        });
      })
      .finally(stopRequest);
  }

  function login(loginData) {
    return api.login(loginData)
      .then(({ token, ...userData }) => {
        localStorage.setItem('jwt', token);
        return userData;
      })
      .then(setCurrentUser)
      .then(loadSavedMovies)
  }

  function handleLoginSubmit(inputsData, setResponse) {
    startRequest(setResponse);
    login(inputsData)
      .then(() => navigate('/movies'))
      .catch((err) => {
        setResponse({ type: 'error', message: getErrorMessage(err) });
      })
      .finally(stopRequest);
  }

  function handleUpdateUserInfo(inputsData, setResponse) {
    startRequest(setResponse);
    api.updateUserInfo(inputsData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setResponse({ type: 'ok', message: msg.PROFILE_UPDATED });
      })
      .catch((err) => {
        setResponse({
          type: 'error',
          message: err.statusCode === 500 ? msg.PROFILE_UPDATE_FAIL : getErrorMessage(err)
        });
      })
      .finally(stopRequest);
  }

  function handleLogout() {
    localStorage.clear();
    setCurrentUser(null);
    navigate('/');
  };

  function setLike(movies, id, status) {
    return movies.map((movie) =>
      movie.movieId === id ? {...movie, isLiked: status} : movie);
  }

  function handlePutLike({ isLiked, ...movieData }, setMovies) {
    api.addMovie(expandUrl(movieData))
      .then((movieDataEcho) => {
        setSavedMovies((prevData) => prevData.concat(movieDataEcho));
        setMovies((prevData) => setLike(prevData, movieData.movieId, true));
      })
      .catch((err) => {
        console.log(getErrorMessage(err));
      })
  }

  function handleRemoveLike(movieId, setMovies, hasLike, playEffect) {
    const { _id } = savedMovies.find((movie) => movie.movieId === movieId);
    api.removeMovie(_id)
      .then(() => {
        const deleteMovie = (prevData) => prevData.filter((movie) => movie._id !== _id);
        setSavedMovies(deleteMovie);
        if (hasLike) {
          setMovies((prevData) => setLike(prevData, movieId, false));
        } else {
          playEffect(() => setMovies(deleteMovie));
        }
      })
      .catch((err) => {
        console.log(getErrorMessage(err));
      })
  }


  return (
    <GlobalContext.Provider value={ globalState }>
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="app">
        <Routes>
          <Route path="/" element={ <Main /> } />
          <Route path="/movies" element={ <Protected element={<Movies />} /> } />
          <Route path="/saved-movies" element={ <Protected element={<SavedMovies />} /> } />
          <Route path="/profile" element={ <Protected element={<Profile />} /> } />
          <Route path="/signin" element={ <Login /> } />
          <Route path="/signup" element={ <Register /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
        {currentUser && <Navigation isActive={isNavActive} onClose={closeNav} />}
      </div>
    </CurrentUserContext.Provider>
    </GlobalContext.Provider>
  );
}
