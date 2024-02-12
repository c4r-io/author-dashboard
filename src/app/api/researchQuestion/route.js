import connectMongoDB from '@/config/connectMongoDB.js';
import ResearchQuestion from '@/models/researchQuestionModel.js';
import { admin, protect } from '@/middleware/authMiddleware';
import filehandler from '@/lib/filehandler';
// @desc Get all researchQuestions
// @route GET api/researchQuestions
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
  const count = await ResearchQuestion.countDocuments({ ...keywords });
  const apiFunction = ResearchQuestion.find({ ...keywords })
  .limit(pageSize)
  .skip(pageSize * (page - 1))
  .sort({ createdAt: -1 });
  if (req.nextUrl.searchParams.get('select')) {
    apiFunction.select(req.nextUrl.searchParams.get('select'));
  }
  const researchQuestions = await apiFunction.exec();
  console.log('page', researchQuestions);
  return Response.json({
    researchQuestions,
    page,
    pages: Math.ceil(count / pageSize),
  });
}
// @desc Post researchQuestion
// @route POST api/researchQuestions
// @acess Privet
export async function POST(req, context) {
  connectMongoDB();
  const researchQuestion = {};
  // start if
  if (researchQuestion) {
    // convert to js object
    const body = await req.formData();
    if (body.get('questionType')) {
      researchQuestion['questionType'] = body.get('questionType');
    }
    if (body.get('question1')) {
      researchQuestion['question1'] = body.get('question1');
    }
    if (body.get('description1')) {
      researchQuestion['description1'] = body.get('description1');
    }
    if (body.get('question2')) {
      researchQuestion['question2'] = body.get('question2');
    }
    if (body.get('question2Placeholder')) {
      researchQuestion['question2Placeholder'] = body.get('question2Placeholder');
    }
    const createdResearchQuestion = await ResearchQuestion.create({
      ...researchQuestion,
    });
    return Response.json({ ...createdResearchQuestion._doc });
    // end if
  } else {
    return Response.json(
      { message: 'ResearchQuestion not found' },
      { status: 404 },
    );
  }
}
