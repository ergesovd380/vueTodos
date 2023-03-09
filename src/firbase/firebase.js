import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDOgC_M-EcWzWst9pCBd06u8tSZ7BYKebk',
    authDomain: 'todos-proj.firebaseapp.com',
    databaseURL: 'https://todos-proj-default-rtdb.firebaseio.com',
    projectId: 'todos-proj',
    storageBucket: 'todos-proj.appspot.com',
    messagingSenderId: '142804096508',
    appId: '1:142804096508:web:0167063a1f54d331cd8e79'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export  {
    db
}
