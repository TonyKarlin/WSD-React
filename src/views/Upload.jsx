import {useFile, useMedia} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import {useNavigate} from 'react-router';
import {useState} from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();

  const doUpload = async () => {
    try {
      const token = window.localStorage.getItem('token');
      const fileResult = await postFile(file, token);
      const mediaResult = await postMedia(fileResult.data, inputs, token);
      console.log('mediaResult', mediaResult);
      navigate('/');
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doUpload);

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      const selectedFile = evt.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(selectedFile.type)) {
        alert('Invalid file type. Please upload an image or video.');
        return;
      }

      if (selectedFile.size > maxSize) {
        alert('File size exceeds 10MB. Please upload a smaller file.');
        return;
      }

      setFile(selectedFile);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-6 text-3xl font-bold text-white">Upload</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4 rounded-lg bg-white p-6 shadow-md"
      >
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium text-stone-700"
          >
            Title
          </label>
          <input
            name="title"
            type="text"
            id="title"
            placeholder="Media title"
            onChange={handleInputChange}
            className="w-full rounded-md border border-stone-500 p-2 text-stone-900 focus:ring-2 focus:ring-stone-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-stone-700"
          >
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            id="description"
            placeholder="Media description"
            onChange={handleInputChange}
            className="w-full rounded-md border border-stone-500 p-2 text-stone-900 focus:ring-2 focus:ring-stone-500 focus:outline-none"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="file"
            className="mb-1 block text-sm font-medium text-stone-700"
          >
            File
          </label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            className="block w-full cursor-pointer rounded-md border border-stone-500 bg-stone-50 text-sm text-stone-900 focus:ring-2 focus:ring-stone-500 focus:outline-none"
          />
        </div>
        <div className="flex justify-center">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://placehold.co/600x400?text=Choose+image'
            }
            alt="preview"
            className="h-48 w-48 rounded-md border border-stone-500 object-cover"
          />
        </div>
        <button
          type="submit"
          disabled={!(file && inputs?.title.length > 3)}
          className={`w-full rounded-md px-4 py-2 font-semibold text-white ${
            file && inputs?.title.length > 3
              ? 'bg-stone-500 hover:bg-stone-600'
              : 'cursor-not-allowed bg-stone-500'
          }`}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
