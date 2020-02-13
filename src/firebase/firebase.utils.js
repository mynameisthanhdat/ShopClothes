import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBTjQWH3Dfhv4RmzjXgIhRYLwrP7L1wdqo",
  authDomain: "clothes-crwn.firebaseapp.com",
  databaseURL: "https://clothes-crwn.firebaseio.com",
  projectId: "clothes-crwn",
  storageBucket: "clothes-crwn.appspot.com",
  messagingSenderId: "1010922695217",
  appId: "1:1010922695217:web:a3b55f6b604c7edad9c310",
  measurementId: "G-D77HWERYV2"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.meesage);
    }
  }
  return userRef;

}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;