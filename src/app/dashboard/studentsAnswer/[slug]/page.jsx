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
  const [studentsAnswerResponse, setStudentsAnswerResponse] = useState(null);
  const [researchQuestion, setResearchQuestion] = useState(null);
  const [question1Answer, setQuestion1Answer] = useState(null);
  const [question2Answer, setQuestion2Answer] = useState(null);
  const getStudentsAnswer = async () => {
    dispatchUserData({ type: 'checkLogin' });
    const config = {
      method: 'GET',
      url: 'api/studentsAnswer/' + params.slug,
      headers: {
        Authorization: `Bearer ${getToken('token')}`,
      },
    };
    try {
      const response = await api.request(config);
      setStudentsAnswerResponse(response.data);
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
      router.push('/dashboard/studentsAnswer');
      console.error(error);
    }
  };
  useEffect(() => {
    getStudentsAnswer();
  }, [params.slug]);
  useEffect(() => {
    setResearchQuestion(
      studentsAnswerResponse?.studentsAnswers?.researchQuestion,
    );
    setQuestion1Answer(
      studentsAnswerResponse?.studentsAnswers?.question1Answer,
    );
    setQuestion2Answer(
      studentsAnswerResponse?.studentsAnswers?.question2Answer,
    );
  }, [studentsAnswerResponse]);
  // update user data
  // content type form data
  const updateStudentsAnswer = async (e) => {
    e.preventDefault();
    dispatchUserData({ type: 'checkLogin' });
    const data = {};
    if (
      researchQuestion &&
      studentsAnswerResponse?.studentsAnswers?.researchQuestion !==
        researchQuestion
    ) {
      data.researchQuestion = researchQuestion;
    }
    if (
      question1Answer &&
      studentsAnswerResponse?.studentsAnswers?.question1Answer !==
        question1Answer
    ) {
      data.question1Answer = question1Answer;
    }
    if (
      question2Answer &&
      studentsAnswerResponse?.studentsAnswers?.question2Answer !==
        question2Answer
    ) {
      data.question2Answer = question2Answer;
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
      url: 'api/studentsAnswer/' + params.slug,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken('token')}`,
      },
      // bodyObject
      data,
    };
    try {
      const response = await api.request(config);
      router.push('/dashboard/studentsAnswer');
      getStudentsAnswer;
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
            htmlFor="researchQuestion"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Research question
          </label>
          <input
            type="text"
            id="researchQuestion"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Research question"
            defaultValue={
              studentsAnswerResponse?.studentsAnswers?.researchQuestion
            }
            onInput={(e) => setResearchQuestion(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="question1Answer"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Question1 answer
          </label>
          <input
            type="text"
            id="question1Answer"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Question1 answer"
            defaultValue={
              studentsAnswerResponse?.studentsAnswers?.question1Answer
            }
            onInput={(e) => setQuestion1Answer(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="question2Answer"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Question2 answer
          </label>
          <input
            type="text"
            id="question2Answer"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Question2 answer"
            defaultValue={
              studentsAnswerResponse?.studentsAnswers?.question2Answer
            }
            onInput={(e) => setQuestion2Answer(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={updateStudentsAnswer}
        >
          Update Students answer
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
