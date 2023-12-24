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
    .then(response => {
      userSubject.next(response.data);
      localStorage.setItem('token', JSON.stringify(response.data));

      return response.data;
    });
}

function register(username, email, password, password_match) {
  return fetchWrapper.post(`${baseUrl}/users/`, { username, email, password, password_match })
    .then(response => {
      return response.data;
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
