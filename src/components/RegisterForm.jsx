import {useNavigate} from 'react-router';
import {useAuthentication} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';

const RegisterForm = () => {
  // TODO: implement
  const {postLogin} = useAuthentication();
  const navigate = useNavigate();

  const initValues = {
    email: '',
    username: '',
    password: '',
  };

  const doRegister = async () => {
    console.log('Register funktiota kutsuttu');
    console.log('Inputs', inputs);
    const registerResult = await postLogin(inputs);
    navigate('/profile');
    console.log('regRes', registerResult);
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginemail">Email</label>
          <input
            name="email"
            type="text"
            id="loginemail"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="register-password">Password</label>
          <input
            name="password"
            type="password"
            id="register-password"
            onChange={handleInputChange}
            autoComplete="register-password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
