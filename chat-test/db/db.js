import * as firebase from 'firebase';


var config = {
      apiKey: 'AIzaSyD424_hN6APLjpkvvT9fqLL7cJnfbkhzUc',
      authDomain: 'chat-fd67b.firebaseapp.com',
      databaseURL: 'https://chat-fd67b.firebaseio.com',
      projectId: 'chat-fd67b',
      storageBucket: 'chat-fd67b.appspot.com',
      messagingSenderId: '816764903403',
    };
export const db= !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();