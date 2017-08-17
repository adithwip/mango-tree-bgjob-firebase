import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCj6RvfU17VhH2kitjgg1vkn1wcW27m4is",
    authDomain: "mango-tree-simulator.firebaseapp.com",
    databaseURL: "https://mango-tree-simulator.firebaseio.com",
    projectId: "mango-tree-simulator",
    storageBucket: "mango-tree-simulator.appspot.com",
    messagingSenderId: "284791009011"
	};
	firebase.initializeApp(config);

ReactDOM.render(
	<App />, 
	document.getElementById('root')
);
registerServiceWorker();
