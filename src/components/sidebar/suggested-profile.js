/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { updatedLoggedInUserFollowing, updateFollowerUserFollowers } from '../../services/firebase'

export default function SuggestedProfile ({ profileDocId, username, profileId, userId , loggedInUserDocId}) {
    const [followed, setFollowed] = useState(false);
    
    async function handleFollowUser() {
        setFollowed(true);
        
        //  update following array of thw logged in user 

        await updatedLoggedInUserFollowing(loggedInUserDocId, profileId, false );
        // update the followers  array of the user who has been followers

        await updateFollowerUserFollowers(profileDocId, userId, false);
    }
    
    return !followed ? (
        <div className='flex flex-row items-center justify-between align-items'>
            <div className='flex items-center justify-between'>
                <img
                    className='flex w-8 mr-3 rounded-full'
                    src={`/images/avatars/${username}.jpg`}
                    alt=''
                />
                <Link to={`/p/${username}`}>
                    <p className='text-sm font-bold'>

                       {username} 
                    </p>
                    
                </Link>
            </div>
              <button
                    className='text-xs font-bold text-blue-medium'
                    type='button'
                    onClick={handleFollowUser}
              >
               Follow
               </button>   
       </div>     

    ): null;
    
}



SuggestedProfile.propTypes = {
    profileDocId :PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired
  };