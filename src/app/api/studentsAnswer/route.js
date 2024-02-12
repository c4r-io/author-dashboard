import connectMongoDB from '@/config/connectMongoDB.js';
import StudentsAnswer from '@/models/studentsAnswerModel.js';
import { admin, protect } from '@/middleware/authMiddleware';
import filehandler from '@/lib/filehandler';
// @desc Get all studentsAnswers
// @route GET api/studentsAnswers
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
  const count = await StudentsAnswer.countDocuments({ ...keywords });
  const apiFunction = StudentsAnswer.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });
  if (req.nextUrl.searchParams.get('select')) {
    apiFunction.select(req.nextUrl.searchParams.get('select'));
  }
  const studentsAnswers = await apiFunction.exec();
  return Response.json({
    studentsAnswers,
    page,
    pages: Math.ceil(count / pageSize),
  });
}
// @desc Post studentsAnswer
// @route POST api/studentsAnswers
// @acess Privet
export async function POST(req, context) {
  connectMongoDB();
  const studentsAnswer = {};
  // start if
  if (studentsAnswer) {
    // convert to js object
    const body = await req.formData();
    if (body.get('researchQuestion')) {
      studentsAnswer['researchQuestion'] = body.get('researchQuestion');
    }
    if (body.get('question1Answer')) {
      studentsAnswer['question1Answer'] = body.get('question1Answer');
    }
    if (body.get('question2Answer')) {
      studentsAnswer['question2Answer'] = body.get('question2Answer');
    }
    const createdStudentsAnswer = await StudentsAnswer.create({
      ...studentsAnswer,
    });
    return Response.json({ ...createdStudentsAnswer._doc });
    // end if
  } else {
    return Response.json(
      { message: 'StudentsAnswer not found' },
      { status: 404 },
    );
  }
}
