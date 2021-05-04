import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import configure from './store/configure';
import i18n from './utils/i18n/i18n';

import Routes from './App.route';
import './App.css';

import socketClient  from "socket.io-client";
const SERVER = "http://localhost:3001"

export const store = configure();
export const socket = socketClient(SERVER);

const App: React.FC = () => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </I18nextProvider>
);

export default App;