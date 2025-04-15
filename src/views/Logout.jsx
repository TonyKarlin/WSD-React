import LoginForm from '../components/LoginForm';
import {useUserContext} from '../hooks/contextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();
  handleLogout();
  console.log('Logged out');
  return <p>Logged out</p>;
};

export default Logout;
