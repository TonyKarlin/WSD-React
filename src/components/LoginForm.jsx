import useForm from '../hooks/formHooks';
import {useUserContext} from '../hooks/contextHooks';

const LoginForm = () => {
  const {handleLogin} = useUserContext();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      await handleLogin(inputs);
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  console.log(inputs);
  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="loginuser" className="mb-1 block text-lg font-medium">
            Username
          </label>
          <input
            onChange={handleInputChange}
            autoComplete="username"
            type="text"
            id="loginuser"
            name="username"
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div>
          <label
            htmlFor="loginpassword"
            className="mb-1 block text-lg font-medium"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
