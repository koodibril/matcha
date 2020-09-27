import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import configure from './store/configure';
import i18n from './utils/i18n/i18n';

import Routes from './App.route';

export const store = configure();

const App: React.FC = () => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </I18nextProvider>
);

export default App;