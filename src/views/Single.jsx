import React from 'react';
import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const item = state.item;

  const navigate = useNavigate();

  const navigationHandler = () => {
    navigate(-1);
  };

  return (
    <>
      {item && (
        <div>
          <button onClick={navigationHandler}>Back</button>
          {item.media_type.includes('video') ? (
            <video src={item.filename} controls />
          ) : (
            <img src={item.filename} alt={item.title} />
          )}
          <h3>Title: {item.title}</h3>
          <p>{item.description}</p>
        </div>
      )}
    </>
  );
};

export default Single;
