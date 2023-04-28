const emailRegexp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const registerValidationRules = {
  name: [
    [text => Boolean(text), 'Имя обязательно'],
    [text => text.length >= 2, 'Имя не должно быть меньше 2 символов'],
    [text => text.length <= 30, 'Имя не должно превышать 30 символов']
  ],
  email: [
    [text => Boolean(text), 'E-mail обязателен'],
    [text => emailRegexp.test(text), 'Неверный формат электронного адреса']
  ],
  password: [
    [text => Boolean(text), 'Пароль обязателен']
  ],
};

const { name, email, password } = registerValidationRules;

export const loginValidationRules = {email, password};

export const profileValidationRules = {name, email};
