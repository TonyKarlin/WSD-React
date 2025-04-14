import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [formToggle, setFormToggle] = useState(true);

  const toggleForm = () => {
    setFormToggle(!formToggle);
  };

  return (
    <>
      <p>{formToggle ? 'Not registered?' : 'Already have a user?'}</p>
      <button onClick={toggleForm}>{formToggle ? 'Register' : 'Login'}</button>
      {formToggle ? <LoginForm /> : <RegisterForm />}
    </>
  );
};

export default Login;
