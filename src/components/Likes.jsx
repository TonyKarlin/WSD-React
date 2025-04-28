import React, {useEffect, useState} from 'react';
import {useLike} from '../hooks/apiHooks';

const Likes = ({mediaId, token}) => {
  const {getLikesByMediaId, getLikesByUser, postLike, deleteLike} = useLike();
  const [likes, setLikes] = useState([]);
  const [userLikes, setUserLikes] = useState(false);
  const fetchLikes = async () => {
    try {
      const mediaLikes = await getLikesByMediaId(mediaId);
      setLikes(mediaLikes);

      if (token) {
        const userLikesData = await getLikesByUser(token);
        const hasLiked = userLikesData.some(
          (like) => like.media_id === mediaId,
        );
        setUserLikes(hasLiked);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleLike = async () => {
    try {
      if (userLikes) {
        await deleteLike(mediaId, token);
      } else {
        await postLike(mediaId, token);
      }
      fetchLikes(); // Refresh likes after liking/unliking
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [mediaId, token]);

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={handleLike}
        className={`rounded-md px-4 py-2 ${
          userLikes ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
        }`}
      >
        {userLikes ? 'Unlike' : 'Like'}
      </button>
      <p>
        {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
      </p>
    </div>
  );
};

export default Likes;
