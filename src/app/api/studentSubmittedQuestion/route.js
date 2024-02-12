import connectMongoDB from '@/config/connectMongoDB.js';
import StudentSubmittedQuestion from '@/models/studentSubmittedQuestionModel.js';
import { admin, protect } from '@/middleware/authMiddleware';
import filehandler from '@/lib/filehandler';
// @desc Get all studentSubmittedQuestions
// @route GET api/studentSubmittedQuestions
// @acess Privet
export async function GET(req, res) {
  const keywords = {};
  // in case if the query is not js object
  // if (
  //   !(await protect(req))
  // ) {
  //   return Response.json({ mesg: "Not authorized" })
  // }
  connectMongoDB();
  const pageSize = Number(req.nextUrl.searchParams.get('pageSize')) || 30;
  const page = Number(req.nextUrl.searchParams.get('pageNumber')) || 1;
  const count = await StudentSubmittedQuestion.countDocuments({ ...keywords });
  const apiFunction = StudentSubmittedQuestion.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });
  if (req.nextUrl.searchParams.get('select')) {
    apiFunction.select(req.nextUrl.searchParams.get('select'));
  }
  const studentSubmittedQuestions = await apiFunction.exec();
  return Response.json({
    studentSubmittedQuestions,
    page,
    pages: Math.ceil(count / pageSize),
  });
}
// @desc Post studentSubmittedQuestion
// @route POST api/studentSubmittedQuestions
// @acess Privet
export async function POST(req, context) {
  connectMongoDB();
  const studentSubmittedQuestion = {};
  // start if
  if (studentSubmittedQuestion) {
    // convert to js object
    const body = await req.formData();
    if (body.get('content')) {
      studentSubmittedQuestion['content'] = body.get('content');
    }
    const createdStudentSubmittedQuestion =
      await StudentSubmittedQuestion.create({ ...studentSubmittedQuestion });
    return Response.json({ ...createdStudentSubmittedQuestion._doc });
    // end if
  } else {
    return Response.json(
      { message: 'StudentSubmittedQuestion not found' },
      { status: 404 },
    );
  }
}
