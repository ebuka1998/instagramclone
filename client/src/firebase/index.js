import firebase from "firebase/app";

import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDf09wzH5WnbiBHIx_XjrJt4I3tySfCtuk",
  authDomain: "angtodo-35238.firebaseapp.com",
  databaseURL: "https://angtodo-35238.firebaseio.com",
  projectId: "angtodo-35238",
  storageBucket: "angtodo-35238.appspot.com",
  messagingSenderId: "651305310636",
  appId: "1:651305310636:web:87089413bfeffd8ca20209",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default};
