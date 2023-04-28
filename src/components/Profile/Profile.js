import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/contexts';
import { profileValidationRules } from '../../utils/validation/signValidation';
import { useValidation } from '../../utils/customHooks';
import './Profile.css';

export default function Profile() {

  const currentUser = React.useContext(CurrentUserContext);
  const [ { inputsContent, showError, errorText, onChange, onBlur },
    isFormInvalid ] = useValidation(profileValidationRules);

  function handleFormSubmit(evt) {
    evt.preventDefault();

  }

  return (
    <div className="profile">
      <Header />
      <section className="profile__container">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <form className="profile__form" name="profile" noValidate={true} onSubmit={handleFormSubmit}>
          <span className="profile__error">{showError.name && errorText.name}</span>
          <div className={`profile__field${showError.name && errorText.name ? ' error' : ''}`}>
            <label className="profile__label" htmlFor="name">Имя</label>
            <input type="name" className="profile__input"
              name="name" id="name" maxLength="30"
              value={inputsContent.name} {...{onChange, onBlur}} />
          </div>
          <div className={`profile__field${showError.email && errorText.email ? ' error' : ''}`}>
            <label className="profile__label" htmlFor="email">E-mail</label>
            <input type="email" className="profile__input"
              name="email" id="email"
              value={inputsContent.email} {...{onChange, onBlur}} />
          </div>
          <span className="profile__error">{showError.email && errorText.email}</span>
          <button type="submit" className="profile__submit interactive"
            disabled={isFormInvalid}
          >
            Редактировать
          </button>
        </form>
        <nav className="profile__nav">
          <Link className="profile__link interactive_type_2" to="/">
            Выйти из аккаунта
          </Link>
        </nav>
      </section>
    </div>
  );
}
