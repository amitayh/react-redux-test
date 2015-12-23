import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App';
import DevTools from './containers/DevTools';
import store from './store';

render(
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
