import useForm from '../hooks/formHooks';
import Login from '../views/Login';
import {useUserContext} from '../hooks/contextHooks';

// LoginForm.jsx
const LoginForm = () => {
  const {handleLogin} = useUserContext();
  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    console.log(inputs);
    try {
      await handleLogin(inputs);
    } catch (er) {
      console.log('doLogin error', er);
      alert(er.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  console.log(inputs);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
