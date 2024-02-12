import connectMongoDB from '@/config/connectMongoDB.js';
import StudentSubmittedQuestion from '@/models/studentSubmittedQuestionModel.js';
import { admin, protect } from '@/middleware/authMiddleware';
import filehandler from '@/lib/filehandler';
// @desc Get studentSubmittedQuestion by id
// @route GET api/studentSubmittedQuestions/:id
// @acess Privet
export async function GET(req, context) {
  // if (
  //   !(await protect(req))
  // ) {
  //   return Response.json({ mesg: "Not authorized" })
  // }
  const { params } = context;
  connectMongoDB();
  const apiFunction = StudentSubmittedQuestion.findById(params.slug);
  if (req.nextUrl.searchParams.get('select')) {
    apiFunction.select(req.nextUrl.searchParams.get('select'));
  }
  const studentSubmittedQuestions = await apiFunction.exec();
  return Response.json({ studentSubmittedQuestions });
}
// @desc Put studentSubmittedQuestion
// @route PUT api/studentSubmittedQuestions/:id
// @acess Privet
export async function PUT(req, context) {
  // if (!(await protect(req))) {
  //   return Response.json({ mesg: 'Not authorized' });
  // }
  const { params } = context;
  connectMongoDB();
  const studentSubmittedQuestion = await StudentSubmittedQuestion.findById(
    params.slug,
  );
  // start if
  if (studentSubmittedQuestion) {
    // convert to js object
    const body = await req.formData();
    if (body.get('content')) {
      studentSubmittedQuestion.content = body.get('content');
    }
    const updatedStudentSubmittedQuestion =
      await studentSubmittedQuestion.save();
    return Response.json({ ...updatedStudentSubmittedQuestion._doc });
    // end if
  } else {
    return Response.json(
      { message: 'StudentSubmittedQuestion not found' },
      { status: 404 },
    );
  }
}
// @desc Delete studentSubmittedQuestion by id
// @route DELETE api/studentSubmittedQuestions/:id
// @acess Privet
export async function DELETE(req, context) {
  const { params } = context;
  connectMongoDB();
  const studentSubmittedQuestions = await StudentSubmittedQuestion.findById(
    params.slug,
  );
  if (studentSubmittedQuestions) {
    await studentSubmittedQuestions.deleteOne();
    return Response.json({ message: 'StudentSubmittedQuestion removed' });
  } else {
    return Response.json(
      { message: 'StudentSubmittedQuestion not found' },
      { status: 404 },
    );
  }
}
