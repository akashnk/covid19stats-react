import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import TableProvider from './TableContext';

// console.log(TableProvider);


ReactDOM.render(
<TableProvider>
    <App />
</TableProvider>,
  document.getElementById('root')
);



serviceWorker.unregister();
