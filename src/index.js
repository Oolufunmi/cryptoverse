import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './app/store';
import {Provider} from 'react-redux';

ReactDom.render(
<Router>
    <Provider store={store}>
    <App />
    </Provider>
</Router>, document.getElementById('root'));