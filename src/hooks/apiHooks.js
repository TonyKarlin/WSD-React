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

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );

    console.log('login result', loginResult);

    window.localStorage.setItem('token', loginResult.token);

    return loginResult;
  };

  console.log('post', postLogin);

  return {postLogin};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchData(`${authApiUrl}/users`, fetchOptions);
  };

  const getUserByToken = async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer: ' + token, // Space is important after 'Bearer:(here)'
      },
    };
    const userData = await fetchData(`${authApiUrl}/users/token`, fetchOptions);

    console.log('userData', userData);
    return userData;
  };
  return {getUserByToken, postUser};
};

export {useMedia, useAuthentication, useUser};
