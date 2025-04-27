import Likes from './Likes';
import {useUserContext} from '../hooks/contextHooks';
import PropTypes from 'prop-types';

const SingleView = (props) => {
  const {item, setSelectedItem} = props;
  const {user} = useUserContext();

  const handleClick = () => {
    setSelectedItem(null);
  };

  return (
    <>
      {item && (
        <dialog className="fixed top-[5%] left-[10%] h-dvh overflow-auto" open>
          <button onClick={handleClick}>&#10005;</button>
          {item.media_type.includes('video') ? (
            <video src={item.filename} controls />
          ) : (
            <img src={item.filename} alt={item.title} />
          )}
          <h3>Title: {item.title}</h3>
          <p>{item.description}</p>
          <Likes
            className="rounded-md bg-red-500 px-4 py-2 text-gray-900 hover:bg-red-600"
            mediaId={item.media_id}
            token={user?.token}
          />
        </dialog>
      )}
    </>
  );
};

SingleView.propTypes = {
  item: PropTypes.object.isRequired,
  setMediaItem: PropTypes.func.isRequired,
};
export default SingleView;
