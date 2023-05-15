import React from 'react';
import SignPane from '../SignPane/SignPane';
import InputBox from '../InputBox/InputBox';
import { loginValidationRules } from '../../utils/validation/signValidation';
import { GlobalContext } from '../../contexts/contexts';
import './Login.css';

export default function Login() {

  const { isMakingRequest, handleLoginSubmit } = React.useContext(GlobalContext);
  const [response, setResponse] = React.useState({ message: '' });

  return (
    <div className="login">
      <SignPane
        title="Рады видеть!"
        submitText="Войти"
        prompt="Ещё не зарегистрированы?"
        linkText="Регистрация"
        linkPath="/signup"
        onSubmit={handleLoginSubmit}
        validationObject={loginValidationRules}
        {...{isMakingRequest, response, setResponse}}
      >
        <InputBox type="email" name="email" label="E-mail" id="email" />
        <InputBox type="password" name="password" label="Пароль" id="password" />
      </SignPane>
    </div>
  );
}
