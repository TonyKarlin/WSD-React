import {useEffect, useState} from 'react';
import {MediaRow} from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {Route, BrowserRouter as Router, Routes} from 'react-router';
import {fetchData} from '../utils/fetchData.js';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);
  //const [users, setUserIds] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log('selectedItem', selectedItem);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaUrl = import.meta.env.VITE_MEDIA_API;
        const mediaData = await fetchData(mediaUrl + '/media');

        const authApiUrl = import.meta.env.VITE_AUTH_API;

        // const userIds = mediaData.map(({user_id}) => user_id);

        const newData = await Promise.all(
          mediaData.map(async (item) => {
            const data = await fetchData(`${authApiUrl}/users/${item.user_id}`);

            return {...item, username: data.username};
          }),
        );

        setMediaArray(newData);
      } catch (e) {
        console.error('error', e);
      }
    };

    getMedia();
  }, []);

  console.log('media array', mediaArray);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </>
  );
};

export default Home;
