import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/index';
import '../assets/application.scss';

import { App } from './components/App';

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));
