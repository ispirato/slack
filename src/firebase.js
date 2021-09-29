import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDzyp3YdCshzhmEkrU3XXT3qsgai9UTtl4",
  authDomain: "slack-clone-yt-1af79.firebaseapp.com",
  projectId: "slack-clone-yt-1af79",
  storageBucket: "slack-clone-yt-1af79.appspot.com",
  messagingSenderId: "106757092110",
  appId: "1:106757092110:web:21748acbcad63efb201d5f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };