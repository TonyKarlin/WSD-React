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
        <dialog
          className="dialog-overlay max-w[800px] fixed inset-0 z-50 m-auto flex h-auto max-h-[400px] flex-col items-center justify-center rounded-b-lg p-8"
          open
        >
          <button
            className="z-50 ml-auto rounded bg-white p-2 text-gray-500 shadow-md hover:text-gray-700"
            onClick={handleClick}
          >
            &#10005;
          </button>
          {item.media_type.includes('video') ? (
            <video src={item.filename} controls />
          ) : (
            <img
              className="max-h-[300px] w-full rounded-md object-contain"
              src={item.filename}
              alt={item.title}
            />
          )}
          <h3 className="mt-3 self-start">Title: {item.title}</h3>
          <p className="mt-3 mb-3 self-start">{item.description}</p>
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
