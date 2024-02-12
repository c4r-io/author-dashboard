import connectMongoDB from '@/config/connectMongoDB.js';
import StudentsAnswer from '@/models/studentsAnswerModel.js';
import { admin, protect } from '@/middleware/authMiddleware';
import filehandler from '@/lib/filehandler';
// @desc Get studentsAnswer by id
// @route GET api/studentsAnswers/:id
// @acess Privet
export async function GET(req, context) {
  // if (
  //   !(await protect(req))
  // ) {
  //   return Response.json({ mesg: "Not authorized" })
  // }
  const { params } = context;
  connectMongoDB();
  const apiFunction = StudentsAnswer.findById(params.slug);
  if (req.nextUrl.searchParams.get('select')) {
    apiFunction.select(req.nextUrl.searchParams.get('select'));
  }
  const studentsAnswers = await apiFunction.exec();
  return Response.json({ studentsAnswers });
}
// @desc Put studentsAnswer
// @route PUT api/studentsAnswers/:id
// @acess Privet
export async function PUT(req, context) {
  if (!(await protect(req))) {
    return Response.json({ mesg: 'Not authorized' });
  }
  const { params } = context;
  connectMongoDB();
  const studentsAnswer = await StudentsAnswer.findById(params.slug);
  // start if
  if (studentsAnswer) {
    // convert to js object
    const body = await req.formData();
    if (body.get('researchQuestion')) {
      studentsAnswer.researchQuestion = body.get('researchQuestion');
    }
    if (body.get('question1Answer')) {
      studentsAnswer.question1Answer = body.get('question1Answer');
    }
    if (body.get('question2Answer')) {
      studentsAnswer.question2Answer = body.get('question2Answer');
    }
    const updatedStudentsAnswer = await studentsAnswer.save();
    return Response.json({ ...updatedStudentsAnswer._doc });
    // end if
  } else {
    return Response.json(
      { message: 'StudentsAnswer not found' },
      { status: 404 },
    );
  }
}
// @desc Delete studentsAnswer by id
// @route DELETE api/studentsAnswers/:id
// @acess Privet
export async function DELETE(req, context) {
  const { params } = context;
  connectMongoDB();
  const studentsAnswers = await StudentsAnswer.findById(params.slug);
  if (studentsAnswers) {
    await studentsAnswers.deleteOne();
    return Response.json({ message: 'StudentsAnswer removed' });
  } else {
    return Response.json(
      { message: 'StudentsAnswer not found' },
      { status: 404 },
    );
  }
}
