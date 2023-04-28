import React from 'react';
import SignPane from '../SignPane/SignPane';
import InputBox from '../InputBox/InputBox';
import { loginValidationRules } from '../../utils/validation/signValidation';
import './Login.css';

export default function Login() {

  function handleFormSubmit() {

  }

  return (
    <div className="login">
      <SignPane
        title="Рады видеть!"
        submitText="Войти"
        prompt="Ещё не зарегистрированы?"
        linkText="Регистрация"
        linkPath="/signup"
        onSubmit={handleFormSubmit}
        validationObject={loginValidationRules}
      >
        <InputBox type="email" name="email" label="E-mail" id="email" />
        <InputBox type="password" name="password" label="Пароль" id="password" />
      </SignPane>
    </div>
  );
}
