import { ok } from "assert";

// Array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users') || '') || [];

interface Opts {
  body: string;
  method: 'POST' | 'GET' | 'DELETE';
  headers: any;
}

export const configureFakeBackend = () => {
  const realFetch = window.fetch;

  window.fetch = (url: string, opts: Opts) => {
    const { method, headers } = opts;
    const body = opts.body && JSON.parse(opts.body);

    return new Promise((resolve: any, reject: any) => {
      const handleRoute = () => {
        switch (true) {
          case url.endsWith('/users/authenticate') && method === 'POST':
            return authenticate();
          case url.endsWith('/users/register') && method === 'POST':
            return register();
          case url.endsWith('/users') && method === 'GET':
            return getUsers();
          case url.match(/\/users\/\d+$/) && method === 'DELETE':
            return deleteUser();
          default:
            // Pass through any requests not handled above
            return realFetch(url, opts)
              .then((response: any) => resolve(response))
              .catch((error: any) => reject(error));
        }
      }

      const authenticate = () => {
        const { username, password } = body;
        const user = users.find((x: any) => x.username === username && x.password === password);

        if (!user) return error('Username or password is incorrect');

        return ok({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          token: 'fake-jwt-token',
        });
      };

      const register = () => {
        const user = body;

        if (users.find((x: any) => x.username === user.username)) return error(`Username ${user.username} is already taken`);

        // Assign user id and a few other properties then save
        user.id = users.length ? Math.max(...users.map((x: any) => x.id)) + 1 : 1;
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        return ok();
      };

      const getUsers = () => {
        if (!isLoggedIn()) return unauthorized();

        return ok(users);
      };

      const deleteUser = () => {
        if (!isLoggedIn()) return unauthorized();

        users = users.filter((x: any) => x.id !== idFromUrl());
        localStorage.setItem('users', JSON.stringify(users));
        return ok();
      }

      const ok = (body?: any) => {
        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
      }

      const unauthorized = () => {
        resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) });
      }

      const error = (message: string) => {
        resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
      }

      const isLoggedIn = () => {
        return headers['Authorization'] === 'Bearer fake-jwt-token';
      };

      const idFromUrl = () => {
        const urlParts = url.split('/');
        return parseInt(urlParts[urlParts.length - 1]);
      };

      // Wrap in timeout to simulate server API call
      setTimeout(handleRoute, 500);
    })
  }
}
