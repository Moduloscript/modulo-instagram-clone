/* eslint-disable prettier/prettier */
import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comment';

export default function Post({ content }) {
  const commentInput = useRef(null);
 
  const handleFocus = () => commentInput.current.focus();
    // As Components
    // Posts would Entain header, image, actions ( like & comment icons), footer, comments 

   
    return <div className = 'col-span-4 mb-8 bg-white border rounded border-gray-primary'>
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      < Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikePhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput= {commentInput}
      
      />
        </div>
}

Post.propTypes = {
    content: PropTypes.shape({
      username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
       userLikePhoto: PropTypes.bool.isRequired,
       comments: PropTypes.array.isRequired,
        likes: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired
     
  }) 
}