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
  const [r2rMuUiResponse, setR2rMuUiResponse] = useState(null);
  const [headerTitle, setHeaderTitle] = useState(null);
  const [headerContent, setHeaderContent] = useState(null);
  const [headerFooter, setHeaderFooter] = useState(null);
  const [headerRaven, setHeaderRaven] = useState(null);
  const [wheelHeaderText, setWheelHeaderText] = useState(null);
  const [wheelFooterText, setWheelFooterText] = useState(null);

  const [wheelFooterToggleButtonText1, setWheelFooterToggleButtonText1] =
    useState(null);
  const [wheelFooterToggleButtonText2, setWheelFooterToggleButtonText2] =
    useState(null);
  const [wheelDonePickingText, setWheelDonePickingText] = useState(null);
  const [wheelDoneRechooseButtonText, setWheelDoneRechooseButtonText] =
    useState(null);
  const [questionToUserText, setQuestionToUserText] = useState(null);
  const [questionToUserRaven, setQuestionToUserRaven] = useState(null);
  const [questionToUserButtonText, setQuestionToUserButtonText] =
    useState(null);
  const [greatJobText, setGreatJobText] = useState(null);
  const [greatJobRaven, setGreatJobRaven] = useState(null);
  const [considerThisText, setConsiderThisText] = useState(null);
  const [closingScreenText, setClosingScreenText] = useState(null);
  const [nextScreenButtonText, setNextScreenButtonText] = useState(null);
  const getR2rMuUi = async () => {
    dispatchUserData({ type: 'checkLogin' });
    const config = {
      method: 'GET',
      url: 'api/r2rMuUi/' + params.slug,
      headers: {
        Authorization: `Bearer ${getToken('token')}`,
      },
    };
    try {
      const response = await api.request(config);
      setR2rMuUiResponse(response.data);
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
      router.push('/dashboard/r2rMuUi');
      console.error(error);
    }
  };
  useEffect(() => {
    getR2rMuUi();
  }, [params.slug]);
  useEffect(() => {
    setHeaderTitle(r2rMuUiResponse?.r2rMuUis?.headerTitle);
    setHeaderContent(r2rMuUiResponse?.r2rMuUis?.headerContent);
    setHeaderFooter(r2rMuUiResponse?.r2rMuUis?.headerFooter);
    setHeaderRaven(r2rMuUiResponse?.r2rMuUis?.headerRaven);
    setWheelHeaderText(r2rMuUiResponse?.r2rMuUis?.wheelHeaderText);
    setWheelFooterText(r2rMuUiResponse?.r2rMuUis?.wheelFooterText);
    setWheelFooterToggleButtonText1(
      r2rMuUiResponse?.r2rMuUis?.wheelFooterToggleButtonText1,
    );
    setWheelFooterToggleButtonText2(
      r2rMuUiResponse?.r2rMuUis?.wheelFooterToggleButtonText2,
    );
    setWheelDonePickingText(r2rMuUiResponse?.r2rMuUis?.wheelDonePickingText);
    setWheelDoneRechooseButtonText(
      r2rMuUiResponse?.r2rMuUis?.wheelDoneRechooseButtonText,
    );
    setQuestionToUserText(r2rMuUiResponse?.r2rMuUis?.questionToUserText);
    setQuestionToUserRaven(r2rMuUiResponse?.r2rMuUis?.questionToUserRaven);
    setQuestionToUserButtonText(
      r2rMuUiResponse?.r2rMuUis?.questionToUserButtonText,
    );
    setGreatJobText(r2rMuUiResponse?.r2rMuUis?.greatJobText);
    setGreatJobRaven(r2rMuUiResponse?.r2rMuUis?.greatJobRaven);
    setConsiderThisText(r2rMuUiResponse?.r2rMuUis?.considerThisText);
    setClosingScreenText(r2rMuUiResponse?.r2rMuUis?.closingScreenText);
    setNextScreenButtonText(r2rMuUiResponse?.r2rMuUis?.nextScreenButtonText);
  }, [r2rMuUiResponse]);
  // update user data
  // content type form data
  const updateR2rMuUi = async (e) => {
    e.preventDefault();
    dispatchUserData({ type: 'checkLogin' });
    const data = {};
    if (headerTitle && r2rMuUiResponse?.r2rMuUis?.headerTitle !== headerTitle) {
      data.headerTitle = headerTitle;
    }
    if (
      headerContent &&
      r2rMuUiResponse?.r2rMuUis?.headerContent !== headerContent
    ) {
      data.headerContent = headerContent;
    }
    if (
      headerFooter &&
      r2rMuUiResponse?.r2rMuUis?.headerFooter !== headerFooter
    ) {
      data.headerFooter = headerFooter;
    }
    if (
      headerRaven &&
      headerRaven.name &&
      headerRaven.lastModified &&
      r2rMuUiResponse?.r2rMuUis?.headerRaven !== headerRaven
    ) {
      data.headerRaven = headerRaven;
    }
    if (
      wheelHeaderText &&
      r2rMuUiResponse?.r2rMuUis?.wheelHeaderText !== wheelHeaderText
    ) {
      data.wheelHeaderText = wheelHeaderText;
    }
    if (
      wheelFooterText &&
      r2rMuUiResponse?.r2rMuUis?.wheelFooterText !== wheelFooterText
    ) {
      data.wheelFooterText = wheelFooterText;
    }
    if (
      wheelFooterToggleButtonText1 &&
      r2rMuUiResponse?.r2rMuUis?.wheelFooterToggleButtonText1 !==
      wheelFooterToggleButtonText1
    ) {
      data.wheelFooterToggleButtonText1 = wheelFooterToggleButtonText1;
    }
    if (
      wheelFooterToggleButtonText2 &&
      r2rMuUiResponse?.r2rMuUis?.wheelFooterToggleButtonText2 !==
      wheelFooterToggleButtonText2
    ) {
      data.wheelFooterToggleButtonText2 = wheelFooterToggleButtonText2;
    }
    if (
      wheelDonePickingText &&
      r2rMuUiResponse?.r2rMuUis?.wheelDonePickingText !== wheelDonePickingText
    ) {
      data.wheelDonePickingText = wheelDonePickingText;
    }
    if (
      wheelDoneRechooseButtonText &&
      r2rMuUiResponse?.r2rMuUis?.wheelDoneRechooseButtonText !==
      wheelDoneRechooseButtonText
    ) {
      data.wheelDoneRechooseButtonText = wheelDoneRechooseButtonText;
    }
    if (
      questionToUserText &&
      r2rMuUiResponse?.r2rMuUis?.questionToUserText !== questionToUserText
    ) {
      data.questionToUserText = questionToUserText;
    }
    if (
      questionToUserRaven &&
      questionToUserRaven.name &&
      questionToUserRaven.lastModified &&
      r2rMuUiResponse?.r2rMuUis?.questionToUserRaven !== questionToUserRaven
    ) {
      data.questionToUserRaven = questionToUserRaven;
    }
    if (
      questionToUserButtonText &&
      r2rMuUiResponse?.r2rMuUis?.questionToUserButtonText !==
      questionToUserButtonText
    ) {
      data.questionToUserButtonText = questionToUserButtonText;
    }
    if (
      greatJobText &&
      r2rMuUiResponse?.r2rMuUis?.greatJobText !== greatJobText
    ) {
      data.greatJobText = greatJobText;
    }
    if (
      greatJobRaven &&
      greatJobRaven.name &&
      greatJobRaven.lastModified &&
      r2rMuUiResponse?.r2rMuUis?.greatJobRaven !== greatJobRaven
    ) {
      data.greatJobRaven = greatJobRaven;
    }
    if (
      considerThisText &&
      r2rMuUiResponse?.r2rMuUis?.considerThisText !== considerThisText
    ) {
      data.considerThisText = considerThisText;
    }
    if (
      closingScreenText &&
      r2rMuUiResponse?.r2rMuUis?.closingScreenText !== closingScreenText
    ) {
      data.closingScreenText = closingScreenText;
    }
    if (
      nextScreenButtonText &&
      r2rMuUiResponse?.r2rMuUis?.nextScreenButtonText !== nextScreenButtonText
    ) {
      data.nextScreenButtonText = nextScreenButtonText;
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
      url: 'api/r2rMuUi/' + params.slug,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken('token')}`,
      },
      // bodyObject
      data,
    };
    try {
      const response = await api.request(config);
      // router.push('/dashboard/r2rMuUi');
      // getR2rMuUi();
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
          <textarea
            type="textarea"
            id="headerTitle"
            className="h-64 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Header title"
            defaultValue={r2rMuUiResponse?.r2rMuUis?.headerTitle}
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
            defaultValue={r2rMuUiResponse?.r2rMuUis?.headerContent}
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
            defaultValue={r2rMuUiResponse?.r2rMuUis?.headerFooter}
            onInput={(e) => setHeaderFooter(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <div>Previous file</div>
          <img
            className="w-64"
            src={r2rMuUiResponse?.r2rMuUis?.headerRaven?.data}
          ></img>
        </div>
        <div className="mb-6">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="headerRaven"
            >
              Upload Header raven file
            </label>
            <input
              className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="headerRaven_help"
              id="headerRaven"
              type="file"
              onChange={(e) => setHeaderRaven(e.target.files[0])}
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="wheelHeaderText"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Wheel header text
          </label>
          <input
            type="text"
            id="wheelHeaderText"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Wheel header text"
            defaultValue={r2rMuUiResponse?.r2rMuUis?.wheelHeaderText}
            onInput={(e) => setWheelHeaderText(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="wheelFooterText"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Wheel footer text
          </label>
          <input
            type="text"
            id="wheelFooterText"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Wheel footer text"
            defaultValue={r2rMuUiResponse?.r2rMuUis?.wheelFooterText}
            onInput={(e) => setWheelFooterText(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="wheelFooterToggleButtonText1"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Wheel footer toggle button text 1
          </label>
          <input
            type="text"
            id="wheelFooterToggleButtonText1"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Wheel footer toggle button text 1"
            defaultValue={
              r2rMuUiResponse?.r2rMuUis?.wheelFooterToggleButtonText1
            }
            onInput={(e) => setWheelFooterToggleButtonText1(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="wheelFooterToggleButtonText2"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Wheel footer toggle button text 2
          </label>
          <input
            type="text"
            id="wheelFooterToggleButtonText2"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Wheel footer toggle button text 2"
            defaultValue={
              r2rMuUiResponse?.r2rMuUis?.wheelFooterToggleButtonText2
            }
            onInput={(e) => setWheelFooterToggleButtonText2(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="wheelDonePickingText"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Wheel done picking text
          </label>
          <input
            type="text"
            id="wheelDonePickingText"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Wheel done picking text"
            defaultValue={r2rMuUiResponse?.r2rMuUis?.wheelDonePickingText}
            onInput={(e) => setWheelDonePickingText(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="questionToUserText"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Question to user text
          </label>
          <input
            type="text"
            id="questionToUserText"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Question to user text"
            defaultValue={r2rMuUiResponse?.r2rMuUis?.questionToUserText}
            onInput={(e) => setQuestionToUserText(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="wheelDoneRechooseButtonText"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Wheel done rechoose button text
          </label>
          <input
            type="text"
            id="wheelDoneRechooseButtonText"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Wheel done rechoose button text"
            defaultValue={
              r2rMuUiResponse?.r2rMuUis?.wheelDoneRechooseButtonText
            }
            onInput={(e) => setWheelDoneRechooseButtonText(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <div>Previous file</div>
          <img
            className="w-64"
            src={r2rMuUiResponse?.r2rMuUis?.questionToUserRaven?.data}
          ></img>
        </div>
        <div className="mb-6">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="questionToUserRaven"
            >
              Upload Question to user raven file
            </label>
            <input
              className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="questionToUserRaven_help"
              id="questionToUserRaven"
              type="file"
              onChange={(e) => setQuestionToUserRaven(e.target.files[0])}
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="questionToUserButtonText"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Question to user button text
          </label>
          <input
            type="text"
            id="questionToUserButtonText"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Question to user button text"
            defaultValue={r2rMuUiResponse?.r2rMuUis?.questionToUserButtonText}
            onInput={(e) => setQuestionToUserButtonText(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="greatJobText"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Great job text
          </label>
          <div >
            <textarea
              type="textarea"
              id="headerContent"
              className="h-64 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Header content"
              defaultValue={r2rMuUiResponse?.r2rMuUis?.greatJobText}
              onInput={(e) => setGreatJobText(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-6">
          <div>Previous file</div>
          <img
            className="w-64"
            src={r2rMuUiResponse?.r2rMuUis?.greatJobRaven?.data}
          ></img>
        </div>
        <div className="mb-6">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="greatJobRaven"
            >
              Upload Great job raven file
            </label>
            <input
              className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="greatJobRaven_help"
              id="greatJobRaven"
              type="file"
              onChange={(e) => setGreatJobRaven(e.target.files[0])}
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="considerThisText"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Consider this text
          </label>
          <textarea
            type="textarea"
            id="considerThisText"
            className="h-64 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="considerThisText"
            defaultValue={r2rMuUiResponse?.r2rMuUis?.considerThisText}
            onInput={(e) => setConsiderThisText(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="closingScreenText"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Closing screen text
          </label>
          <textarea
            type="textarea"
            id="closingScreenText"
            className="h-64 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="closingScreenText"
            defaultValue={r2rMuUiResponse?.r2rMuUis?.closingScreenText}
            onInput={(e) => setClosingScreenText(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="nextScreenButtonText"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {' '}
            Next screen button text
          </label>
          <input
            type="text"
            id="nextScreenButtonText"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Next screen button text"
            defaultValue={r2rMuUiResponse?.r2rMuUis?.nextScreenButtonText}
            onInput={(e) => setNextScreenButtonText(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={updateR2rMuUi}
        >
          Update R2r mu ui
        </button>
      </div>
    </div>
  );
};
export default Page;