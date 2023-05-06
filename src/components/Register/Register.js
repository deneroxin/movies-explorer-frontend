import React from 'react';
import SignPane from '../SignPane/SignPane';
import InputBox from '../InputBox/InputBox';
import { registerValidationRules } from '../../utils/validation/signValidation';
import './Register.css';

export default function Register() {

  function handleFormSubmit() {

  }

  return (
    <div className="register">
      <SignPane
        title="Добро пожаловать!"
        submitText="Зарегистрироваться"
        prompt="Уже зарегистрированы?"
        linkText="Войти"
        linkPath="/signin"
        onSubmit={handleFormSubmit}
        validationObject={registerValidationRules}
      >
        <InputBox type="text" name="name" label="Имя" id="name" maxLength="30" />
        <InputBox type="email" name="email" label="E-mail" id="email" />
        <InputBox type="password" name="password" label="Пароль" id="password" />
      </SignPane>
    </div>
  );
}
