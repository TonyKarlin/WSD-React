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
    re_enter: '',
  };

  const doRegister = async () => {
    await postLogin(inputs);
    navigate('/profile');
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
            name="register-password"
            type="password"
            id="register-password"
            onChange={handleInputChange}
            autoComplete="register-password"
          />
        </div>
        <div>
          <label htmlFor="re-enter-password">Re-Enter Password</label>
          <input
            name="re-enter"
            type="password"
            id="re-enter-password"
            onChange={handleInputChange}
            autoComplete="re-enter"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
