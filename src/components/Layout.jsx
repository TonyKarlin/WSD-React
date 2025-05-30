import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();
  useEffect(() => {
    console.log('autologin!');
    handleAutoLogin();
  }, []); // Leave error as it is or add "useCallback()" to wrap getUserbyToken() in apiHooks

  return (
    <div>
      <header>
        <h1 className="mb-4 text-4xl">My App</h1>
        <nav>
          <ul className="mb-2 flex list-none justify-end bg-[#333] p-2 **:p-4 **:hover:bg-[#111]">
            <li>
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/upload">Upload</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

Layout.propTypes = {};

export default Layout;
