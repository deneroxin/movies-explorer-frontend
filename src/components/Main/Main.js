import React from 'react';
import Header from '../Header/Header';
import NavTab from './NavTab/NavTab';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../contexts/contexts';
import './Main.css';

export default function Main() {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="main">
      {currentUser ? <Header promoStyle /> : <NavTab />}
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}
