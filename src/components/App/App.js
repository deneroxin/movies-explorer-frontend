import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CurrentUserContext, GlobalStateContext, GlobalHandlersContext } from '../../contexts/contexts';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Navigation from '../Navigation/Navigation';

export default function App() {

  const [globalState, setGlobalState] = React.useState({
    isMakingRequest: false,
  });
  const [currentUser, setCurrentUser] = React.useState({ name: 'Виталий' });
  const [isNavActive, setNavActive] = React.useState(false);

  const handlers = React.useMemo(() => ({
    openNav,
    startSearching,
  }), []);

  function openNav() {
    setNavActive(true);
  }

  function closeNav() {
    setNavActive(false);
  }

  function startSearching(requestText) {
    console.log(requestText);
  }

  return (
    <GlobalHandlersContext.Provider value={ handlers }>
    <GlobalStateContext.Provider value={ globalState }>
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="app">
        <Routes>
          <Route path="/" element={ <Main /> } />
          <Route path="/movies" element={ <Movies /> } />
          <Route path="/saved-movies" element={ <SavedMovies /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/signin" element={ <Login /> } />
          <Route path="/signup" element={ <Register /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
        {currentUser && <Navigation isActive={isNavActive} onClose={closeNav} />}
      </div>
    </CurrentUserContext.Provider>
    </GlobalStateContext.Provider>
    </GlobalHandlersContext.Provider>
  );
}
