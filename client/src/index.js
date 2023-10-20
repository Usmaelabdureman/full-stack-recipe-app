import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Amplify, Interactions } from 'aws-amplify';
import awsmobile from './aws-exports';
import {Provider } from 'react-redux';
import store from './redux/store';
Amplify.configure(awsmobile);
Amplify.configure({
  Interactions: {
    bots: {
      "todayweatherbot": {
        "name": "todayweatherbot",
        "alias": "$LATEST",
        "region": "us-east-1",
      },
    }
  }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
