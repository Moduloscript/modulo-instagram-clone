/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Header({ username }) {
    return (
        <div className='flex h-4 p-4 py-8 border-border-gray-primary'>
            <div className='flex items-center'>
                <Link to={`/p/${username}`} className='flex items-center'>
                <img
                    className='flex h-8 mr-3 rounded-full'
                    src={`/images/avatars/${username}.jpg`}
                    alt={`${username} p`}
                />
                <p className='font-bold'>{username }</p>
                
                </Link>
                
            </div>

        </div>
    )
}

Header.propTypes = {
   username: PropTypes.string.isRequired,
    
}