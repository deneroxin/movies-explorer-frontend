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
import { msg, codes } from '../../constants/constants';
import { api } from '../../utils/MainApi';
import { getErrorMessage } from '../../utils/utils';


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
        if (err.statusCode === codes.INTERNAL_SERVER_ERROR) {
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

  const globalState = {
    tryingToAuthorize,
    isMakingRequest,
    savedMovies,
    setSavedMovies,
    startRequest,
    stopRequest,
    openNav,
    handleRegisterSubmit,
    handleLoginSubmit,
    handleUpdateUserInfo,
    handleLogout,
  };

  const [isNavActive, setNavActive] = React.useState(false);

  const navigate = useNavigate();

  function openNav() {
    setNavActive(true);
  }

  function closeNav() {
    setNavActive(false);
  }

  function startRequest(setResponse) {
    setResponse({ message: '' });
    setIsMakingRequest(true);
  }

  function stopRequest() {
    setIsMakingRequest(false);
  }

  function loadSavedMovies() {
    return api.getMovies().then(setSavedMovies)
  }

  function handleRegisterSubmit(inputsData, setResponse) {
    startRequest(setResponse);
    api.createUser(inputsData)
      .then(() => {
        setResponse({ type: 'ok', message: msg.REGISTER_SUCCESS });
        const { email, password } = inputsData;
        return login({ email, password })
          .catch((err) => setResponse({
            type: 'error',
            message: `${msg.REGISTERED_BUT_NOT_AUTHORIZED}: ${getErrorMessage(err)}`
          }));
      })
      .catch((err) => {
        setResponse({
          type: 'error',
          message: err.statusCode === codes.INTERNAL_SERVER_ERROR
            ? msg.REGISTER_FAIL : getErrorMessage(err)
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
          message: err.statusCode === codes.INTERNAL_SERVER_ERROR
            ? msg.PROFILE_UPDATE_FAIL : getErrorMessage(err)
        });
      })
      .finally(stopRequest);
  }

  function handleLogout() {
    localStorage.clear();
    setCurrentUser(null);
    setSavedMovies([]);
    navigate('/');
  };

  return (
    <GlobalContext.Provider value={ globalState }>
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="app">
        <Routes>
          <Route path="/" element={ <Main /> } />
          <Route path="/movies" element={ <Protected element={<Movies />} /> } />
          <Route path="/saved-movies" element={ <Protected element={<SavedMovies />} /> } />
          <Route path="/profile" element={ <Protected element={<Profile />} /> } />
          <Route path="/signin" element={ <Protected inverse element={<Login />} /> } />
          <Route path="/signup" element={ <Protected inverse element={<Register />} /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
        {currentUser && <Navigation isActive={isNavActive} onClose={closeNav} />}
      </div>
    </CurrentUserContext.Provider>
    </GlobalContext.Provider>
  );
}
