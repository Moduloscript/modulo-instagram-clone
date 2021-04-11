/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/Header'
import UserProfile from '../components/profile/index'

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userExists, setUserExists] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user[0]);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }

      checkUserExists();
  }, [username, history]);

  return user?.username ? (
      <div className="bg-gray-background">
          <Header />
          <div className="max-w-screen-lg mx-auto">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
