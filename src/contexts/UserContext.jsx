// UserContext.jsx
import {createContext, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useLocation, useNavigate} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();

  const location = useLocation();

  // login, logout and autologin functions are here instead of components
  const handleLogin = async (credentials) => {
    // TODO: post login credentials to API
    const loginResult = await postLogin(credentials);
    // TODO: set token to local storage (done in the postLogin)
    console.log('login result', loginResult);
    if (loginResult) {
      // TODO: set user to state
      setUser(loginResult.user);
    }
    // TODO: navigate to home
    navigate('/');
  };

  const handleLogout = () => {
    try {
      // TODO: remove token from local storage
      localStorage.removeItem('token');
      // TODO: set user to null
      setUser(null);
      // TODO: navigate to home
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = async () => {
    try {
      // TODO: get token from local storage
      const token = localStorage.getItem('token');
      // TODO: if token exists, get user data from API
      if (token) {
        const userData = await getUserByToken(token);
        console.log('user-data', userData);
        // TODO: set user to state
        setUser(userData.user);
      }
      // TODO: navigate to home
      console.log('location', location);
      navigate(location.pathname);
    } catch (e) {
      // if token not valid
      handleLogout();
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
