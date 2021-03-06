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

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}


export async function getUserByUserId(userId) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();
    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
    return user;

}

export async function getSuggestedProfiles(userId, following) {
    const result = await firebase.firestore().collection('users').limit(10).get();
  
    return result.docs
      .map((user) => ({ ...user.data(), docId: user.id }))
      .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}
  
//  updatedLoggedInUserFollowing, updateFollowerUserFollowers

export async function updatedLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowingProfile) {
    return firebase
        .firestore()
        .collection('users')
        .doc(loggedInUserDocId)
        .update({
            followers: isFollowingProfile
                ? FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
                
        });
    
}

export async function updateFollowerUserFollowers(profileDocId, loggedInUserDocId, isFollowingProfile) {
    return firebase
        .firestore()
        .collection('users')
        .doc(profileDocId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(loggedInUserDocId)
                : FieldValue.arrayUnion(loggedInUserDocId)
                
        });
    
}


export async function getPhotos(userId, following) {
    // [5,4,2] => following
    const result = await firebase
      .firestore()
      .collection('photos')
      .where('userId', 'in', following)
      .get();
  
    const userFollowedPhotos = result.docs.map((photo) => ({
      ...photo.data(),
      docId: photo.id
    }));
  
 
  
    const photosWithUserDetails = await Promise.all(
      userFollowedPhotos.map(async (photo) => {
        let userLikedPhoto = false;
        if (photo.likes.includes(userId)) {
          userLikedPhoto = true;
        }
        // photo.userId = 2
        const user = await getUserByUserId(photo.userId);
        // raphael
        const { username } = user[0];
        return { username, ...photo, userLikedPhoto };
      })
    );
  
    return photosWithUserDetails;
}
  
export async function getUserPhotosByUsername(username ) {
  const [user ] = await getUserByUsername(username );
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', user.userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername) // karl (active logged in user)
    .where('following', 'array-contains', profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

 
  return response.userId;
}


export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
){
  await updatedLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);

  // 1st param: karl's user id
  // 2nd param: raphael's doc id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateFollowerUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}