import connectMongoDB from '@/config/connectMongoDB.js';
import ResearchQuestion from '@/models/researchQuestionModel.js';
import { admin, protect } from '@/middleware/authMiddleware';
import filehandler from '@/lib/filehandler';
// @desc Get researchQuestion by id
// @route GET api/researchQuestions/:id
// @acess Privet
export async function GET(req, context) {
  // if (
  //   !(await protect(req))
  // ) {
  //   return Response.json({ mesg: "Not authorized" })
  // }
  const { params } = context;
  connectMongoDB();
  const apiFunction = ResearchQuestion.findById(params.slug);
  if (req.nextUrl.searchParams.get('select')) {
    apiFunction.select(req.nextUrl.searchParams.get('select'));
  }
  const researchQuestions = await apiFunction.exec();
  return Response.json({ researchQuestions });
}
// @desc Put researchQuestion
// @route PUT api/researchQuestions/:id
// @acess Privet
export async function PUT(req, context) {
  if (!(await protect(req))) {
    return Response.json({ mesg: 'Not authorized' });
  }
  const { params } = context;
  connectMongoDB();
  const researchQuestion = await ResearchQuestion.findById(params.slug);
  // start if
  if (researchQuestion) {
    // convert to js object
    const body = await req.formData();
    if (body.get('questionType')) {
      researchQuestion.questionType = body.get('questionType');
    }
    if (body.get('question1')) {
      researchQuestion.question1 = body.get('question1');
    }
    if (body.get('description1')) {
      researchQuestion.description1 = body.get('description1');
    }
    if (body.get('question2')) {
      researchQuestion.question2 = body.get('question2');
    }
    const updatedResearchQuestion = await researchQuestion.save();
    return Response.json({ ...updatedResearchQuestion._doc });
    // end if
  } else {
    return Response.json(
      { message: 'ResearchQuestion not found' },
      { status: 404 },
    );
  }
}
// @desc Delete researchQuestion by id
// @route DELETE api/researchQuestions/:id
// @acess Privet
export async function DELETE(req, context) {
  const { params } = context;
  connectMongoDB();
  const researchQuestions = await ResearchQuestion.findById(params.slug);
  if (researchQuestions) {
    await researchQuestions.deleteOne();
    return Response.json({ message: 'ResearchQuestion removed' });
  } else {
    return Response.json(
      { message: 'ResearchQuestion not found' },
      { status: 404 },
    );
  }
}
