import 'firebase/auth'
import 'firebase/firebase-firestore'

import * as firebase from 'firebase/app'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messageingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
}

firebase.initializeApp(config)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
const auth = firebase.auth()
export default auth
