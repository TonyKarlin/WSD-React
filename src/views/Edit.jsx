import useForm from '../hooks/formHooks';

const Edit = ({item, modifyMedia, onClose}) => {
  const doEdit = async () => {
    try {
      const token = window.localStorage.getItem('token');

      await modifyMedia(inputs, token);
      onClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doEdit, item);

  return (
    <dialog
      open
      className="fixed top-1/2 left-1/2 w-3/4 max-w-2xl -translate-x-1/2 -translate-y-1/2 transform rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl"
    >
      <h1 className="mb-6 text-center text-4xl font-bold text-gray-800">
        Edit Media
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium text-gray-700">
            Title
          </label>
          <input
            value={inputs.title}
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            placeholder="Enter media title"
            className="rounded-lg border border-gray-300 px-4 py-2 text-stone-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-lg font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            value={inputs.description}
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            placeholder="Enter media description"
            className="rounded-lg border border-gray-300 px-4 py-2 text-stone-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-blue-600"
            type="submit"
            disabled={!(inputs?.title.length > 3)}
          >
            Save
          </button>
          <button
            className="rounded-lg bg-gray-200 px-6 py-2 font-semibold text-gray-700 transition duration-300 hover:bg-gray-300"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default Edit;
