import {Link, useNavigate} from 'react-router';
import PropTypes from 'prop-types';
import {useAuthentication} from '../hooks/apiHooks';

const MediaRow = (props) => {
  const {isLoggedIn} = useAuthentication();
  const {item, setSelectedItem} = props;
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log('edit button clicked');
    navigate(0);
  };

  const handleDelete = () => {
    console.log('delete button clicked');
    navigate(0);
  };

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

          {isLoggedIn && (
            <>
              <button
                type="button"
                className="rounded-md bg-sky-400 px-4 py-2 text-black hover:bg-sky-500"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={handleDelete}
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
