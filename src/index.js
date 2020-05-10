import React from 'react';
import ReactDOM from 'react-dom';
import 'pace-js'
import 'pace-js/themes/blue/pace-theme-minimal.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
 import TableProvider from './TableContext';

// console.log(TableProvider);


ReactDOM.render(
<TableProvider>
    <App />
    </TableProvider>,
  document.getElementById('root')
);



serviceWorker.unregister();
