import getConfig from 'next/config';
import Router from 'next/router';
import { BehaviorSubject } from 'rxjs';

import { fetchWrapper } from '../utils/fetchWrapper';

const { publicRuntimeConfig } = getConfig();

const baseUrl = `${publicRuntimeConfig.apiUrl}/accounts`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('token')));

export const userService = {
  user: userSubject.asObservable(),
  get userValue() { return userSubject.value },
  login,
  logout,
  getUser,
  register
};

function login(username, password) {
  return fetchWrapper.post(`${baseUrl}/token/`, { username, password })
    .then(user => {
      userSubject.next(user);
      localStorage.setItem('token', JSON.stringify(user));

      return user;
    });
}

function register(username, email, password, password_match) {
  return fetchWrapper.post(`${baseUrl}/users/`, { username, email, password, password_match })
    .then(user => {
      return user;
    });
}

function logout() {
  localStorage.removeItem('token');
  userSubject.next(null);
  Router.push('/accounts/login');
}

function getUser() {
  return fetchWrapper.get(baseUrl + '/users/me/');
}
