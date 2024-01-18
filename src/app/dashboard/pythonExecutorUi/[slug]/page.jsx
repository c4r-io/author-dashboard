'use client';
import { api } from '@/utils/apibase';
import { getToken } from '@/utils/token';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/contextapi/UserProvider';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Page = ({ params }) => {
  const { userData, dispatchUserData } = useContext(UserContext);
  const router = useRouter();
  const [pythonExecutorUiResponse, setPythonExecutorUiResponse] =
    useState(null);
  const [headerTitle, setHeaderTitle] = useState(null);
  const [headerContent, setHeaderContent] = useState(null);
  const [headerFooter, setHeaderFooter] = useState(null);
  const getPythonExecutorUi = async () => {
    dispatchUserData({ type: 'checkLogin' });
    const config = {
      method: 'GET',
      url: 'api/pythonExecutorUi/' + params.slug,
      headers: {
        Authorization: `Bearer ${getToken('token')}`,
      },
    };
    try {
      const response = await api.request(config);
      setPythonExecutorUiResponse(response.data);
    } catch (error) {
      if (error?.response?.status == 401) {
        toast.error(error.response.data.message + '. Login to try again.', {
          position: 'top-center',
        });
        router.push('/dashboard');
        return;
      } else {
        toast.error(error.message, {
          position: 'top-center',
        });
      }
      router.push('/dashboard/pythonExecutorUi');
      console.error(error);
    }
  };
  useEffect(() => {
    getPythonExecutorUi();
  }, [params.slug]);
  useEffect(() => {
    setHeaderTitle(pythonExecutorUiResponse?.pythonExecutorUis?.headerTitle);
    setHeaderContent(
      pythonExecutorUiResponse?.pythonExecutorUis?.headerContent,
    );
    setHeaderFooter(pythonExecutorUiResponse?.pythonExecutorUis?.headerFooter);
  }, [pythonExecutorUiResponse]);
  // update user data
  // content type form data
  const updatePythonExecutorUi = async (e) => {
    e.preventDefault();
    dispatchUserData({ type: 'checkLogin' });
    const data = {};
    if (
      headerTitle &&
      pythonExecutorUiResponse?.pythonExecutorUis?.headerTitle !== headerTitle
    ) {
      data.headerTitle = headerTitle;
    }
    if (
      headerContent &&
      pythonExecutorUiResponse?.pythonExecutorUis?.headerContent !==
        headerContent
    ) {
      data.headerContent = headerContent;
    }
    if (
      headerFooter &&
      pythonExecutorUiResponse?.pythonExecutorUis?.headerFooter !== headerFooter
    ) {
      data.headerFooter = headerFooter;
    }
    if (Object.keys(data).length <= 0) {
      toast.error(
        'Empty Form Submission Not Allowed, Try after changing data.',
        {
          position: 'top-center',
        },
      );
      return;
    }
    const config = {
      method: 'put',
      url: 'api/pythonExecutorUi/' + params.slug,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken('token')}`,
      },
      // bodyObject
      data,
    };
    try {
      const response = await api.request(config);
      router.push('/dashboard/pythonExecutorUi');
      getPythonExecutorUi;
      toast.success('Updated Successfully!', {
        position: 'top-center',
      });
    } catch (error) {
      if (error?.response?.status == 401) {
        toast.error(error.response.data.message + '. Login to try again.', {
          position: 'top-center',
        });
        // router.push('/');
      } else {
        toast.error(error.message, {
          position: 'top-center',
        });
      }
      console.error(error);
    }
  };
  return (
    <div className="container mx-auto py-4 px-4 md:px-0">
      <div>
        <div className="mb-6">
          <label
            htmlFor="headerTitle"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Header title
          </label>
          <input
            type="text"
            id="headerTitle"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Header title"
            defaultValue={
              pythonExecutorUiResponse?.pythonExecutorUis?.headerTitle
            }
            onInput={(e) => setHeaderTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="headerContent"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Header content
          </label>
          <textarea
            type="textarea"
            id="headerContent"
            className="h-64 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Header content"
            defaultValue={
              pythonExecutorUiResponse?.pythonExecutorUis?.headerContent
            }
            onInput={(e) => setHeaderContent(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="headerFooter"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Header footer
          </label>
          <input
            type="text"
            id="headerFooter"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Header footer"
            defaultValue={
              pythonExecutorUiResponse?.pythonExecutorUis?.headerFooter
            }
            onInput={(e) => setHeaderFooter(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={updatePythonExecutorUi}
        >
          Update Python executor ui
        </button>
      </div>
    </div>
  );
};
export default Page;
const StringArrayInput = ({ defaultValues, onUpdate, label }) => {
  const [newString, setNewString] = useState('');
  const [stringList, setStringsList] = useState(defaultValues);
  const addNewString = (e) => {
    const cAns = [...stringList, newString.toString()];
    setStringsList(cAns);
    onUpdate(cAns);
    setNewString('');
  };
  const removeOneString = (index) => {
    const incAns = JSON.parse(JSON.stringify(stringList));
    incAns.splice(index, 1);
    setStringsList(incAns);
    onUpdate(incAns);
  };
  useEffect(() => {
    setStringsList(defaultValues);
  }, [defaultValues]);
  return (
    <>
      <div className="mb-2 relative">
        <label
          htmlFor="add_new_incorrect_answer"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {' '}
          {label}
        </label>
        <input
          type="text"
          id="add_new_incorrect_answer"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder={label}
          value={newString}
          onInput={(e) => setNewString(e.target.value)}
        />
        <button
          className="px-3 py-2 rounded-md border border-green-300 bg-green-700 hover:bg-green-600 text-white absolute right-0 bottom-0"
          onClick={() => addNewString()}
        >
          Add
        </button>
      </div>
      <div className="mb-6">
        {stringList?.map((newString, index) => (
          <div
            className="rounded-md bg-gray-500/20 text-white flex justify-between mb-2"
            key={index}
          >
            <div className="px-3 py-2">
              {index + 1}. {newString}
            </div>
            <button
              className="px-3 py-2 rounded-md border border-orange-300 bg-orange-700 hover:bg-orange-600 text-white"
              onClick={() => removeOneString(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
