/* eslint-disable prettier/prettier */
import { useState, useEffect, useContext } from 'react';
import { getPhotos, getUserByUserId } from '../services/firebase';
import UserContext from '../context/user';

export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);

  
  const {
    user: { uid: userId = '' }

  } = useContext (UserContext);

  useEffect(() => {
      async function getTimelinePhotos() {
        const [{following}] = await getUserByUserId(userId);
        let followedUserPhotos = [];

        // does the user actually follow people?
        if (following.length > 0) {
          followedUserPhotos = await getPhotos(userId, following);
        }
        // Render photos in Ascending to descending Order 
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    console.log(userId);
   getTimelinePhotos()

  }, [userId]);
  return { photos };
}



