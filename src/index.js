import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import registerServiceWorker from './registerServiceWorker';
import store from './store';
import routes from './routes';

import './stylesheets/index.css';

ReactDOM.render(
  <Provider store={store}>
    <div>
      { routes }
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-center"
        transitionIn="bounceIn"
        transitionOut="bounceOut"
        progressBar
      />
    </div>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
