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
  const [
    resurchQuestionStatusSelectorResponse,
    setResurchQuestionStatusSelectorResponse,
  ] = useState(null);
  const [status_1, setStatus_1] = useState(null);
  const [status_1Image, setStatus_1Image] = useState(null);
  const [status_2, setStatus_2] = useState(null);
  const [status_2Image, setStatus_2Image] = useState(null);
  const [status_3, setStatus_3] = useState(null);
  const [status_3Image, setStatus_3Image] = useState(null);
  const getResurchQuestionStatusSelector = async () => {
    dispatchUserData({ type: 'checkLogin' });
    const config = {
      method: 'GET',
      url: 'api/resurch_question_status_selector/' + params.slug,
      headers: {
        Authorization: `Bearer ${getToken('token')}`,
      },
    };
    try {
      const response = await api.request(config);
      setResurchQuestionStatusSelectorResponse(response.data);
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
      router.push('/dashboard/resurch_question_status_selector');
      console.error(error);
    }
  };
  useEffect(() => {
    getResurchQuestionStatusSelector();
  }, [params.slug]);
  useEffect(() => {
    setStatus_1(
      resurchQuestionStatusSelectorResponse?.resurchQuestionStatusSelectors
        ?.status_1,
    );
    setStatus_1Image(
      resurchQuestionStatusSelectorResponse?.resurchQuestionStatusSelectors
        ?.status_1Image,
    );
    setStatus_2(
      resurchQuestionStatusSelectorResponse?.resurchQuestionStatusSelectors
        ?.status_2,
    );
    setStatus_2Image(
      resurchQuestionStatusSelectorResponse?.resurchQuestionStatusSelectors
        ?.status_2Image,
    );
    setStatus_3(
      resurchQuestionStatusSelectorResponse?.resurchQuestionStatusSelectors
        ?.status_3,
    );
    setStatus_3Image(
      resurchQuestionStatusSelectorResponse?.resurchQuestionStatusSelectors
        ?.status_3Image,
    );
  }, [resurchQuestionStatusSelectorResponse]);
  // update user data
  // content type form data
  const updateResurchQuestionStatusSelector = async (e) => {
    e.preventDefault();
    dispatchUserData({ type: 'checkLogin' });
    const data = {};
    if (
      status_1 &&
      resurchQuestionStatusSelectorResponse?.resurchQuestionStatusSelectors
        ?.status_1 !== status_1
    ) {
      data.status_1 = status_1;
    }
    if (
      status_1Image &&
      status_1Image.name &&
      status_1Image.lastModified &&
      resurchQuestionStatusSelectorResponse?.resurchQuestionStatusSelectors
        ?.status_1Image !== status_1Image
    ) {
      data.status_1Image = status_1Image;
    }
    if (
      status_2 &&
      resurchQuestionStatusSelectorResponse?.resurchQuestionStatusSelectors
        ?.status_2 !== status_2
    ) {
      data.status_2 = status_2;
    }
    if (
      status_2Image &&
      status_2Image.name &&
      status_2Image.lastModified &&
      resurchQuestionStatusSelectorResponse?.resurchQuestionStatusSelectors
        ?.status_2Image !== status_2Image
    ) {
      data.status_2Image = status_2Image;
    }
    if (
      status_3 &&
      resurchQuestionStatusSelectorResponse?.resurchQuestionStatusSelectors
        ?.status_3 !== status_3
    ) {
      data.status_3 = status_3;
    }
    if (
      status_3Image &&
      status_3Image.name &&
      status_3Image.lastModified &&
      resurchQuestionStatusSelectorResponse?.resurchQuestionStatusSelectors
        ?.status_3Image !== status_3Image
    ) {
      data.status_3Image = status_3Image;
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
      url: 'api/resurch_question_status_selector/' + params.slug,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken('token')}`,
      },
      // bodyObject
      data,
    };
    try {
      const response = await api.request(config);
      router.push('/dashboard/resurch_question_status_selector');
      // getResurchQuestionStatusSelector();
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
        <div className="field_group">
          <label htmlFor="status_1" className="field_label">
            {' '}
            Status 1
          </label>
          <input
            type="text"
            id="status_1"
            className="field_input"
            placeholder="Status 1"
            defaultValue={
              resurchQuestionStatusSelectorResponse
                ?.resurchQuestionStatusSelectors?.status_1
            }
            onInput={(e) => setStatus_1(e.target.value)}
          />
        </div>
        {/* <div className="field_group">
          <div>Previous file</div>
          <img
            className="w-64"
            src={
              resurchQuestionStatusSelectorResponse
                ?.resurchQuestionStatusSelectors?.status_1Image?.data
            }
          ></img>
        </div>
        <div className="field_group">
          <div>
            <label className="field_label" htmlFor="status_1Image">
              Upload Status 1 image file
            </label>
            <input
              className="field_input"
              aria-describedby="status_1Image_help"
              id="status_1Image"
              type="file"
              onChange={(e) => setStatus_1Image(e.target.files[0])}
            />
          </div>
        </div> */}
        <div className="field_group">
          <label htmlFor="status_2" className="field_label">
            {' '}
            Status 2
          </label>
          <input
            type="text"
            id="status_2"
            className="field_input"
            placeholder="Status 2"
            defaultValue={
              resurchQuestionStatusSelectorResponse
                ?.resurchQuestionStatusSelectors?.status_2
            }
            onInput={(e) => setStatus_2(e.target.value)}
          />
        </div>
        {/* <div className="field_group">
          <div>Previous file</div>
          <img
            className="w-64"
            src={
              resurchQuestionStatusSelectorResponse
                ?.resurchQuestionStatusSelectors?.status_2Image?.data
            }
          ></img>
        </div>
        <div className="field_group">
          <div>
            <label className="field_label" htmlFor="status_2Image">
              Upload Status 2 image file
            </label>
            <input
              className="field_input"
              aria-describedby="status_2Image_help"
              id="status_2Image"
              type="file"
              onChange={(e) => setStatus_2Image(e.target.files[0])}
            />
          </div>
        </div> */}
        <div className="field_group">
          <label htmlFor="status_3" className="field_label">
            {' '}
            Status 3
          </label>
          <input
            type="text"
            id="status_3"
            className="field_input"
            placeholder="Status 3"
            defaultValue={
              resurchQuestionStatusSelectorResponse
                ?.resurchQuestionStatusSelectors?.status_3
            }
            onInput={(e) => setStatus_3(e.target.value)}
          />
        </div>
        {/* <div className="field_group">
          <div>Previous file</div>
          <img
            className="w-64"
            src={
              resurchQuestionStatusSelectorResponse
                ?.resurchQuestionStatusSelectors?.status_3Image?.data
            }
          ></img>
        </div>
        <div className="field_group">
          <div>
            <label className="field_label" htmlFor="status_3Image">
              Upload Status 3 image file
            </label>
            <input
              className="field_input"
              aria-describedby="status_3Image_help"
              id="status_3Image"
              type="file"
              onChange={(e) => setStatus_3Image(e.target.files[0])}
            />
          </div>
        </div> */}
        <button
          type="submit"
          className="update_submit_button"
          onClick={updateResurchQuestionStatusSelector}
        >
          Update Resurch question status selector
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
        <label htmlFor="add_new_incorrect_answer" className="field_label">
          {' '}
          {label}
        </label>
        <input
          type="text"
          id="add_new_incorrect_answer"
          className="field_input"
          placeholder={label}
          value={newString}
          onInput={(e) => setNewString(e.target.value)}
        />
        <button className="add_button" onClick={() => addNewString()}>
          Add
        </button>
      </div>
      <div className="field_group">
        <div className="-m-1 flex flex-wrap w-full">
          {stringList?.map((newString, index) => (
            <div className="p-1" key={index}>
              <div className="rounded-md bg-gray-500 text-white flex justify-between mb-2">
                <div className="px-2 py-1">
                  {index + 1}. {newString}
                </div>
                <button
                  className="remove_button"
                  onClick={() => removeOneString(index)}
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
const ObjectInput = ({ defaultValues, onUpdate, label }) => {
  const [newString, setNewString] = useState('');
  const [objectKey, setObjectKey] = useState('');
  const [newObjectList, setNewObjectList] = useState(defaultValues);
  const addNewString = (e) => {
    if (
      newString == '' ||
      objectKey == '' ||
      newString == null ||
      objectKey == null
    ) {
      return;
    }
    const cAns = { ...newObjectList, ...{ [objectKey]: `"${newString}"` } };
    setNewObjectList(cAns);
    onUpdate(cAns);
    setNewString('');
    setObjectKey('');
  };
  const removeOneString = (objectKeyI) => {
    const incAns = JSON.parse(JSON.stringify(newObjectList));
    delete incAns[objectKeyI];
    setNewObjectList(incAns);
    onUpdate(incAns);
  };
  useEffect(() => {
    setNewObjectList(defaultValues);
  }, [defaultValues]);
  return (
    <>
      <div className="mb-2 relative">
        <label htmlFor="add_new_incorrect_answer" className="field_label">
          {' '}
          {label}
        </label>
        <div className="flex">
          <input
            type="text"
            id="object_key"
            className="field_input"
            placeholder={'Key'}
            value={objectKey}
            onInput={(e) => setObjectKey(e.target.value)}
          />
          <input
            type="text"
            id="key_value"
            className="field_input"
            placeholder={'Value'}
            value={newString}
            onInput={(e) => setNewString(e.target.value)}
          />
        </div>
        <button className="add_button" onClick={() => addNewString()}>
          Add
        </button>
      </div>
      <div className="field_group">
        <div className="-m-1 flex flex-wrap w-full">
          {newObjectList &&
            Object.keys(newObjectList)?.map((objectKeyI, index) => (
              <div className="p-1" key={index}>
                <div className="rounded-md bg-gray-500 text-white flex justify-between mb-2">
                  <div className="px-2 py-1">
                    {index + 1}. {objectKeyI}: {newObjectList[objectKeyI]}
                  </div>
                  <button
                    className="remove_button"
                    onClick={() => removeOneString(objectKeyI)}
                  >
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
