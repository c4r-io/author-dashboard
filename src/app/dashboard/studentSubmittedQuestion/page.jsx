'use client';
import { api } from '@/utils/apibase';
import Pagination from '@/components/Pagination.jsx';
import { getToken } from '@/utils/token';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserContext } from '@/contextapi/UserProvider';
const Page = () => {
  function getTrimedString(str, len = 50) {
    const arStr = str?.split(' ');
    let opStr = '';
    if (arStr?.length < 5) {
      return { content: `${str?.slice(0, len)} `, isTrimed: str.length > len };
    }
    if (arStr) {
      for (const iterator of arStr) {
        const testOpStr = opStr + ' ' + iterator;
        if (testOpStr.length < len) {
          opStr = testOpStr;
        } else {
          break;
        }
      }
      return { content: `${opStr} `, isTrimed: str.length > len };
    } else {
      return { content: ` `, isTrimed: false };
    }
  }
  const { userData, dispatchUserData } = useContext(UserContext);
  const router = useRouter();
  const [studentSubmittedQuestionList, setStudentSubmittedQuestionList] =
    useState({
      page: 1,
      pages: 1,
      studentSubmittedQuestions: null,
    });
  const [page, setPage] = useState(1);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get('page');
  if (pageNumber) {
    setPage(pageNumber);
  }
  const getstudentSubmittedQuestionsList = async (page) => {
    dispatchUserData({ type: 'checkLogin' });
    const config = {
      method: 'GET',
      url: 'api/studentSubmittedQuestion',
      headers: {
        Authorization: `Bearer ${getToken('token')}`,
      },
      params: {
        pageNumber: page,
        select: ' content',
      },
    };
    setListLoading(true);
    try {
      const response = await api.request(config);
      setStudentSubmittedQuestionList(response.data);
      console.log(response.data);
      setListLoading(false);
    } catch (error) {
      console.log(error);
      setListLoading(false);
      if (error?.response?.status == 401) {
        toast.error(error.response.data.message + ', Login to try again.', {
          position: 'top-center',
        });
        router.push('/');
      } else {
        toast.error(error.message, {
          position: 'top-center',
        });
      }
    }
  };
  const createSampleStudentSubmittedQuestion = async () => {
    dispatchUserData({ type: 'checkLogin' });
    const config = {
      method: 'post',
      url: 'api/studentSubmittedQuestion',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken('token')}`,
      },
      data: {
        content: 'Sample Content',
      },
    };
    setCreateLoading(true);
    try {
      const response = await api.request(config);
      console.log(response.data);
      setCreateLoading(false);
      router.push('/dashboard/studentSubmittedQuestion/' + response.data._id);
      toast.success('Sample Student submitted question Created Successfully!', {
        position: 'top-center',
      });
    } catch (error) {
      if (error?.response?.status == 401) {
        toast.error(error.response.data.message + '. Login to try again.', {
          position: 'top-center',
        });
        router.push('/');
      } else {
        toast.error(error.message, {
          position: 'top-center',
        });
      }
      console.error(error);
      setCreateLoading(false);
    }
  };
  const deleteConfirmDialog = (id) => {
    setDeleteId(id);
    setDeletePopup(true);
  };
  const deleteStudentSubmittedQuestion = async () => {
    dispatchUserData({ type: 'checkLogin' });
    const config = {
      method: 'delete',
      url: 'api/studentSubmittedQuestion/' + deleteId,
      headers: {
        Authorization: `Bearer ${getToken('token')}`,
      },
    };
    try {
      await api.request(config);
      getstudentSubmittedQuestionsList();
      setDeletePopup(false);
      toast.success('Deleted successfully!', {
        position: 'top-center',
      });
    } catch (error) {
      setDeletePopup(false);
      if (error?.response?.status == 401) {
        toast.error(error.response.data.message + '. Login to try again.', {
          position: 'top-center',
        });
        router.push('/');
      } else {
        toast.error(error.message, {
          position: 'top-center',
        });
      }
      console.error(error);
    }
  };
  const onpageChange = (e) => {
    setPage(Number(e));
    // router.push({ query: { page: e } });
  };
  useEffect(() => {
    getstudentSubmittedQuestionsList(page);
  }, [page]);
  return (
    <div className="container mx-auto py-4 px-4 md:px-0">
      <div>
        <div className="w-full flex justify-end pb-3">
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white  bg-gradient-to-r from-green-700 to-green-600 hover:bg-gradient-to-bl rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => createSampleStudentSubmittedQuestion()}
            disabled={createLoading}
          >
            {!createLoading && (
              <svg
                className="w-3 h-3 mr-1 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            )}
            {createLoading ? 'Creating...' : 'New Student submitted question'}
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Content
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            {!listLoading && (
              <tbody>
                {studentSubmittedQuestionList?.studentSubmittedQuestions?.map(
                  (item, index) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={index}
                    >
                      <td className="px-6 py-4">
                        {getTrimedString(item.content)?.content}
                        {getTrimedString(item.content)?.isTrimed && '...'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex space-x-1 items-center text-base font-semibold text-gray-900 dark:text-white">
                          <button
                            type="button"
                            className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                            onClick={() =>
                              router.push(
                                '/dashboard/studentSubmittedQuestion/' +
                                  item._id,
                              )
                            }
                          >
                            <svg
                              className="w-3 h-3 mr-1 text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 21 21"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
                              />
                            </svg>
                            Edit
                          </button>
                          <button
                            type="button"
                            className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            onClick={() => deleteConfirmDialog(item._id)}
                          >
                            <svg
                              className="w-3 h-3 mr-1 text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 20"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                              />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            )}
          </table>
          {studentSubmittedQuestionList?.studentSubmittedQuestions?.length ==
          0 ? (
            <div className="text-black dark:text-white text-center">
              No data to show
            </div>
          ) : (
            ''
          )}
          {listLoading && (
            <div
              className="z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0  h-full w-full flex justify-center items-center bg-white
  dark:bg-gray-800"
            >
              <div className="flex items-center justify-center w-56 h-56">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        {studentSubmittedQuestionList.pages > 0 && (
          <Pagination
            activePage={page}
            pageLength={studentSubmittedQuestionList?.pages}
            onpageChange={onpageChange}
          />
        )}
      </div>
      {deletePopup && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center bg-gray-50/50">
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={() => setDeletePopup(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this studentSubmittedQuestion?
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  onClick={() => deleteStudentSubmittedQuestion()}
                >
                  Yes, I&apos;m sure
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => {
                    setDeletePopup(false);
                  }}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;
