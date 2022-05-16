// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*const firebaseConfig = {
  apiKey: "AIzaSyCgzFprAwDbsx6PH_OVCyNB3q7emEjOBEQ",
  authDomain: "hadar1.firebaseapp.com",
  projectId: "hadar1",
  storageBucket: "hadar1.appspot.com",
  messagingSenderId: "544885926947",
  appId: "1:544885926947:web:1f9a8ad186d37c4a069596"
};*/

const firebaseConfig = {
  apiKey: 'AIzaSyAdrySwyFM12O8NNWLg0-ciHnHTSQKQtKg',
  authDomain: 'less-loneliness-4795f.firebaseapp.com',
  projectId: 'less-loneliness-4795f',
  storageBucket: 'less-loneliness-4795f.appspot.com',
  messagingSenderId: '800385716565',
  appId: '1:800385716565:web:26d2da10359168454fdfdc',
  measurementId: 'G-MWNBKPLFKD',
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
export const firestore = firebase.firestore;
export const db = firebase.firestore();
export const storage = firebase.storage();
export const storageRef = storage.ref();

export { auth };
