import config from 'config';
import { authHeader } from '../helpers/auth-header';

const login = (username: string, password: string) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user: any) => {
      // Store user detail and JWT in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
};

const logout = () => {
  // Remove user from local storage to log user out
  localStorage.removeItem('user');
};

const getAll = () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    authorization: '',
  };

  return fetch(`${config.apiUrl}/users`, requestOptions)
    .then(handleResponse);
};

const getById = (id: string) => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    authorization: '',
  };

  return fetch(`${config.apiUrl}/users/${id}`, requestOptions)
    .then(handleResponse);
};

const register = (user: any) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }

  return fetch(`${config.apiUrl}/users/register`, requestOptions)
    .then(handleResponse);
};

const update = (user: any) => {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions)
    .then(handleResponse);
};

// Prefixed function name withe underscore because delete is a reserved word
const _delete = (id: any) => {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/users/${id}`, requestOptions)
    .then(handleResponse);
};

const handleResponse = (response: any) => response.text()
  .then((text: any) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if (response.status === 401) {
        // Auto logout if 401 response returned from API
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    };

    return data;
  })

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete,
};
