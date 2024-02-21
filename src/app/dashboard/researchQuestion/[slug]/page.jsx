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
  const [researchQuestionResponse, setResearchQuestionResponse] =
    useState(null);
  const [questionType, setQuestionType] = useState(null);
  const [question1, setQuestion1] = useState(null);
  const [description1, setDescription1] = useState(null);
  const [question2, setQuestion2] = useState(null);
  const [question2Placeholder, setQuestion2Placeholder] = useState(null);
  const getResearchQuestion = async () => {
    dispatchUserData({ type: 'checkLogin' });
    const config = {
      method: 'GET',
      url: 'api/researchQuestion/' + params.slug,
      headers: {
        Authorization: `Bearer ${getToken('token')}`,
      },
    };
    try {
      const response = await api.request(config);
      setResearchQuestionResponse(response.data);
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
      router.push('/dashboard/researchQuestion');
      console.error(error);
    }
  };
  useEffect(() => {
    getResearchQuestion();
  }, [params.slug]);
  useEffect(() => {
    setQuestionType(researchQuestionResponse?.researchQuestions?.questionType);
    setQuestion1(researchQuestionResponse?.researchQuestions?.question1);
    setDescription1(researchQuestionResponse?.researchQuestions?.description1);
    setQuestion2(researchQuestionResponse?.researchQuestions?.question2);
    setQuestion2Placeholder(researchQuestionResponse?.researchQuestions?.question2Placeholder);
  }, [researchQuestionResponse]);
  // update user data
  // content type form data
  const updateResearchQuestion = async (e) => {
    e.preventDefault();
    dispatchUserData({ type: 'checkLogin' });
    const data = {};
    if (
      questionType &&
      researchQuestionResponse?.researchQuestions?.questionType !== questionType
    ) {
      data.questionType = questionType;
    }
    if (
      question1 &&
      researchQuestionResponse?.researchQuestions?.question1 !== question1
    ) {
      data.question1 = question1;
    }
    if (
      description1 &&
      researchQuestionResponse?.researchQuestions?.description1 !== description1
    ) {
      data.description1 = description1;
    }
    if (
      question2 &&
      researchQuestionResponse?.researchQuestions?.question2 !== question2
    ) {
      data.question2 = question2;
    }
    if (
      question2Placeholder &&
      researchQuestionResponse?.researchQuestions?.question2Placeholder !== question2Placeholder
    ) {
      data.question2Placeholder = question2Placeholder;
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
      url: 'api/researchQuestion/' + params.slug,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken('token')}`,
      },
      // bodyObject
      data,
    };
    try {
      const response = await api.request(config);
      router.push('/dashboard/researchQuestion');
      getResearchQuestion;
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
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option for Question type
          </label>
          <select
            id="questionType"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choose an option</option>
            <option value="General Science">General Science</option>
            <option value="Clinical Science">Clinical Science</option>
            <option value="Public Health">Public Health</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="question1"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Question1
          </label>
          <input
            type="text"
            id="question1"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Question1"
            defaultValue={
              researchQuestionResponse?.researchQuestions?.question1
            }
            onInput={(e) => setQuestion1(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description1"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Description1
          </label>
          <textarea
            type="textarea"
            id="description1"
            className="h-64 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Description1"
            defaultValue={
              researchQuestionResponse?.researchQuestions?.description1
            }
            onInput={(e) => setDescription1(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="question2"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Question2
          </label>
          <input
            type="text"
            id="question2"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Question2"
            defaultValue={
              researchQuestionResponse?.researchQuestions?.question2
            }
            onInput={(e) => setQuestion2(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="question2Placeholder"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Question2 Placeholder
          </label>
          <input
            type="text"
            id="question2Placeholder"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="question2Placeholder"
            defaultValue={
              researchQuestionResponse?.researchQuestions?.question2Placeholder
            }
            onInput={(e) => setQuestion2Placeholder(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={updateResearchQuestion}
        >
          Update Research question
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
