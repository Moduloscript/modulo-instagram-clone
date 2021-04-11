/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile } from '../../services/firebase';

export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers = [],
    following = [],
    username: profileUsername
  }
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username !== profileUsername;

  const handleToggleFollow = () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
  };

  useEffect(() => {
    const isloggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
      setIsFollowingProfile(!!isFollowing);
    };

    if (user.username && profileUserId) {
      isloggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);
  return (
    <div className="grid justify-between max-w-screen-lg grid-cols-3 gap-4 mx-auto">
      <div className="container flex items-center justify-center">
        {user.username && (
          <img
            className="flex w-40 h-40 rounded-full"
            alt={`${user.username} profile picture`}
            src={`/images/avatars/${profileUsername}.jpg`}
          />
        )}
      </div>
      <div className="flex-col justify-center col-span-2 item-center ">
        <div className="container flex items-center">
          <p className="mr-4 text-2xl">{profileUsername}</p>
          {activeBtnFollow && (
            <button
              className="w-20 h-8 text-sm font-bold text-white rounded bg-blue-medium"
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following?.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
    username: PropTypes.string
  }).isRequired
};
