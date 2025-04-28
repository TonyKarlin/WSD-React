import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {useAuthentication} from '../hooks/apiHooks';
import {useContext, useState} from 'react';
import {UserContext} from '../contexts/UserContext';
import Edit from '../views/Edit';

const MediaRow = (props) => {
  const {isLoggedIn} = useAuthentication();
  const {item, setSelectedItem, deleteMedia, modifyMedia} = props;
  const [visible, setVisible] = useState(true);
  const token = localStorage.getItem('token');
  const {user} = useContext(UserContext);
  const loggedin_user_id = user ? user.user_id : null;
  const [showEdit, setShowEdit] = useState(false);

  if (!visible) {
    return null;
  }

  return (
    <tr className="border-2 border-gray-300 p-4">
      <td>
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-52 rounded-md object-cover"
        />
      </td>
      <td className="text-lg font-medium">{item.title}</td>
      <td className="text-gray-600">{item.description}</td>
      <td className="text-gray-600">{item.username}</td>
      <td className="text-gray-600">
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </td>
      <td className="text-gray-600">{item.filesize}</td>
      <td className="text-gray-600">{item.media_type}</td>
      <td className="p-0">
        <div className="flex gap-2 p-2">
          <Link
            to="/single"
            state={{item}}
            className="rounded-md bg-amber-300 px-4 py-2 text-gray-900 hover:bg-amber-400"
            onClick={(event) => {
              event.preventDefault();
              setSelectedItem(item);
            }}
          >
            View
          </Link>

          {isLoggedIn && item.user_id === loggedin_user_id && (
            <>
              <button
                type="button"
                className="rounded-md bg-sky-400 px-4 py-2 text-black hover:bg-sky-500"
                onClick={(event) => {
                  event.stopPropagation(); // Prevent triggering parent click events
                  setShowEdit(true);
                }}
              >
                Edit
              </button>
              {showEdit && (
                <Edit
                  item={item}
                  modifyMedia={modifyMedia}
                  onClose={() => setShowEdit(false)}
                />
              )}

              <button
                type="button"
                className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={(event) => {
                  event.stopPropagation(); // Prevent triggering parent click events
                  if (confirm('Are you sure you want to delete this media?')) {
                    deleteMedia(item.media_id, token);
                    setVisible(false);
                  }
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;
