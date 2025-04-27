import {useUser} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';

const RegisterForm = () => {
  const {postUser} = useUser();

  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    console.log('Register funktiota kutsuttu');
    console.log(inputs);
    const userResult = await postUser(inputs);
    console.log(userResult);
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  console.log(inputs);
  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="registeruser"
            className="mb-1 block text-lg font-medium"
          >
            Username
          </label>
          <input
            onChange={handleInputChange}
            autoComplete="username"
            type="text"
            id="registeruser"
            name="username"
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div>
          <label
            htmlFor="registeremail"
            className="mb-1 block text-lg font-medium"
          >
            Email
          </label>
          <input
            onChange={handleInputChange}
            autoComplete="email"
            type="email"
            id="registeremail"
            name="email"
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div>
          <label
            htmlFor="registerpassword"
            className="mb-1 block text-lg font-medium"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
