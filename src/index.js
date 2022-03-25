import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCUtMtJSqU5v5qowpUuV5j8CWWwjIXIlZ0",
  authDomain: "buks-d2b1a.firebaseapp.com",
  projectId: "buks-d2b1a",
  storageBucket: "buks-d2b1a.appspot.com",
  messagingSenderId: "664341696276",
  appId: "1:664341696276:web:e74852cabea02da5623c01",
  measurementId: "G-V3662VJFGY"
})

export const Context = createContext(null)

const firestore = firebaseApp.firestore();

ReactDOM.render(
  <Context.Provider value={{
    firebase, 
    firestore, 
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

reportWebVitals();
