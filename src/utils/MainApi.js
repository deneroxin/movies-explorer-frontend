import { addr } from '../constants/constants';

const defaultHeaders = { 'Content-Type': 'application/json; charset="utf-8"' };

const attachToken = (headers = {}) =>
  ({...headers, ['Authorization']: `Bearer ${localStorage.getItem('jwt')}`});

const getData = (res) => res.json().then((data) => res.ok ? data : Promise.reject(data));

export const api = {

  createUser: (userData) =>
    fetch(`${addr.apiUrl}/signup`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(userData)
    })
    .then(getData),

  login: (loginData) =>
    fetch(`${addr.apiUrl}/signin`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(loginData)
    })
    .then(getData),

  getUserInfo: () =>
    fetch(`${addr.apiUrl}/users/me`, {
      method: 'GET',
      headers: attachToken()
    })
    .then(getData),

  updateUserInfo: (profileData) =>
    fetch(`${addr.apiUrl}/users/me`, {
      method: 'PATCH',
      headers: attachToken(defaultHeaders),
      body: JSON.stringify(profileData)
    })
    .then(getData),

  getMovies: () =>
    fetch(`${addr.apiUrl}/movies`, {
      method: 'GET',
      headers: attachToken()
    })
    .then(getData),

  addMovie: (filmData) =>
    fetch(`${addr.apiUrl}/movies`, {
      method: 'POST',
      headers: attachToken(defaultHeaders),
      body: JSON.stringify(filmData)
    })
    .then(getData),

  removeMovie: (id) =>
    fetch(`${addr.apiUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: attachToken()
    })
    .then(getData)
}
