import React from 'react';

import Page from '../UI/Page/Page';
import Column from '../UI/Column/Column';
import Row from '../UI/Row/Row';

import Routes from './App.route';

import styles from './App.module.css';


const App: React.FC = () => (
  <Page>
    <Column>
      <Routes />
    </Column>
  </Page>
)

export default App;