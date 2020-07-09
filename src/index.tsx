import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
// Components and data
import CurrencyTable from './CurrencyTable';
import Header from './Header';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <CurrencyTable />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
