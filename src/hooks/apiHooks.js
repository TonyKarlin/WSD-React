'use strict';
import {uniqBy} from 'lodash';
import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData';

const mediaUrl = import.meta.env.VITE_MEDIA_API;
const authApiUrl = import.meta.env.VITE_AUTH_API;

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(mediaUrl + '/media');
      const uniqueUserIds = uniqBy(mediaData, 'user_id');

      const newData = await Promise.all(
        uniqueUserIds.map(async (item) => {
          const data = await fetchData(`${authApiUrl}/users/${item.user_id}`);

          return {...item, username: data.username};
        }),
      );

      setMediaArray(newData);
    } catch (e) {
      console.error('error', e);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return {mediaArray};
};

export default useMedia;
