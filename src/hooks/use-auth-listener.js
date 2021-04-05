/* eslint-disable prettier/prettier */
import { useEffect, useContext, useState } from 'react'
import FirebaseContext from '../context/firebase';


export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
           // we have a user ...... therefore we can store user in localstorage
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                localStorage.removeItem('authUser');
                setUser(null);
           }
        })
        return () => listener();
    }, [firebase]);

    return { user };
}