/* eslint-disable prettier/prettier */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import AddComment from './add-comment';


export default function Comments({docId, comments: allComments, posted, commentInput }) {
    const [comments, setComments] = useState(allComments);
   
    return (
        <>
            <div className='p-4 pt-1 pb-4'>
                {comments.length >= 1 && (
                    <p className='mb-1 text-sm cursor-pointer text-gray-base '>

                        View all comments 
                    </p>
                    
                )}
                {comments.slice(0, 3).map((item) => (
                    <p key={`${item.comment}-${item.displayName}`} className='mb-1'>
                        < Link to={`/p/${item.displayName}`}>
                            <span className='mr-1 font-bold'>{item.displayName }</span>
                        </Link>
                        <span>{item.comment}</span>
            </p>
                    
                ))}
                <p className='text-xs uppercase text-gray-base'>

                    {formatDistance(posted, new Date()) } ago
                    
                </p>
            </div>
            <AddComment
                docId={docId}
                comments={comments}
                setComments={setComments}
                commentInput = {commentInput}
                
            />
            </>
      
  )  
}


Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired
  };