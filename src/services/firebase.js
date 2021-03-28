/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();
    

    
    return result.docs.map((user) => user.data().length > 0);

} 