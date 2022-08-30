import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBCyxesgRSmE5Rxblc2JZ-lsETRVGj8P4c",
    authDomain: "whatsapp-clone-by-dhruba.firebaseapp.com",
    projectId: "whatsapp-clone-by-dhruba",
    storageBucket: "whatsapp-clone-by-dhruba.appspot.com",
    messagingSenderId: "764919579848",
    appId: "1:764919579848:web:a8dca7639be257c025d1fd",
    measurementId: "G-LN444YK2WT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;