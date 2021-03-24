/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// imported the SEEDATABASE FILE
import { seedDatabase } from '../seed';


const config = {
        apiKey: 'AIzaSyD_4lQ8blqaoEWf-kVe_oNwTHNxRuVs9m8',
        authDomain: 'insta-modlo-v2.firebaseapp.com',
        projectId: 'insta-modlo-v2',
        storageBucket: 'insta-modlo-v2.appspot.com',
        messagingSenderId: '152660803074',
        appId: '1:152660803074:web:2458f6dae890c3b1f7711b'
      
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// here is where I want to call the seed file (only ONCE!!)
// seedDatabase(firebase);

export { firebase, FieldValue };