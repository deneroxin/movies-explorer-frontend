import React from 'react';
import Header from '../Header/Header';
import { CurrentUserContext, GlobalContext } from '../../contexts/contexts';
import { profileValidationRules } from '../../utils/validation/signValidation';
import { useValidation } from '../../utils/customHooks';
import './Profile.css';

export default function Profile() {

  const { name, email } = React.useContext(CurrentUserContext);
  const { isMakingRequest, handleUpdateUserInfo, handleLogout } = React.useContext(GlobalContext);
  const [response, setResponse] = React.useState({ message: '' });

  const [ { inputsContent, showError, errorText, onChange, onBlur },
    isFormInvalid, setContent ] = useValidation(profileValidationRules);

  React.useEffect(() => setContent({ name, email }), []);

  function handleFormSubmit(evt) {
    evt.preventDefault();
    if (!isMakingRequest) handleUpdateUserInfo(inputsContent, setResponse);
  }

  const error = (field) => showError[field] && errorText[field] ? ' error' : '';
  const serverError = response.type === 'error' ? ' error' : '';
  const makingRequest = isMakingRequest ? ' making-request' : '';

  return (
    <div className="profile">
      <Header />
      <main className="profile__main">
        <section className="profile__container">
          <h1 className="profile__title">{`Привет, ${name}!`}</h1>
          <form className="profile__form" name="profile" noValidate={true} onSubmit={handleFormSubmit}>
            <span className="profile__error">
              {showError.name && errorText.name}
            </span>
            <div className={`profile__field${error('name')}`}>
              <label className="profile__label" htmlFor="name">Имя</label>
              <input type="text" className="profile__input"
                name="name" id="name" maxLength="30"
                value={inputsContent.name} {...{onChange, onBlur}} />
            </div>
            <div className={`profile__field${error('email')}`}>
              <label className="profile__label" htmlFor="email">E-mail</label>
              <input type="email" className="profile__input"
                name="email" id="email"
                value={inputsContent.email} {...{onChange, onBlur}} />
            </div>
            <span className="profile__error">
              {showError.email && errorText.email}
            </span>
            <span className={`profile__server-response${serverError}`}>
              {response.message}
            </span>
            <button type="submit"
              className={`profile__submit interactive${makingRequest}`}
              disabled={isFormInvalid}
            >
              {!isMakingRequest ? 'Редактировать' : 'Не переключайтесь!'}
            </button>
          </form>
          <nav className="profile__nav">
            <button className="profile__logout interactive-type-2" onClick={handleLogout}>
              Выйти из аккаунта
            </button>
          </nav>
        </section>
      </main>
    </div>
  );
}
