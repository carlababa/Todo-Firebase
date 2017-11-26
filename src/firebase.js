import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC44YRzJw_xP7Zm46NI8Q3wAOAJo9S5hI8',
  authDomain: 'react-td-experiment.firebaseapp.com',
  databaseURL: 'https://react-td-experiment.firebaseio.com',
  projectId: 'react-td-experiment',
  storageBucket: 'react-td-experiment.appspot.com',
  messagingSenderId: '736844654237',
};

firebase.initializeApp(config);

export const database = firebase.database();
export const todos = database.ref('/todos');
export const auth = firebase.auth();
export const isAuthenticated = () => !!auth.currentUser;
