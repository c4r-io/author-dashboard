import connectMongoDB from '@/config/connectMongoDB.js';
import R2rMuSubmission from '@/models/r2rMuSubmissionModel.js';
import { admin, protect } from '@/middleware/authMiddleware';
import filehandler from '@/lib/filehandler';
// @desc Get r2rMuSubmission by id
// @route GET api/r2rMuSubmissions/:id
// @acess Privet
export async function GET(req, context) {
  // if (
  //   !(await protect(req))
  // ) {
  //   return Response.json({ mesg: "Not authorized" })
  // }
  const { params } = context;
  connectMongoDB();
  const apiFunction = R2rMuSubmission.findById(params.slug);
  if (req.nextUrl.searchParams.get('select')) {
    apiFunction.select(req.nextUrl.searchParams.get('select'));
  }
  const r2rMuSubmissions = await apiFunction.exec();
  return Response.json({ r2rMuSubmissions });
}
// @desc Put r2rMuSubmission
// @route PUT api/r2rMuSubmissions/:id
// @acess Privet
export async function PUT(req, context) {
  const { params } = context;
  connectMongoDB();
  const r2rMuSubmission = await R2rMuSubmission.findById(params.slug);
  // start if
  if (r2rMuSubmission) {
    // convert to js object
    const body = await req.formData();
    if (body.get('choosenUsers')) {
      r2rMuSubmission.choosenUsers = JSON.parse(body.get('choosenUsers'));
    }
    if (body.get('labid')) {
      r2rMuSubmission.labid = body.get('labid');
    }
    const updatedR2rMuSubmission = await r2rMuSubmission.save();
    return Response.json({ ...updatedR2rMuSubmission._doc });
    // end if
  } else {
    return Response.json(
      { message: 'R2rMuSubmission not found' },
      { status: 404 },
    );
  }
}
// @desc Delete r2rMuSubmission by id
// @route DELETE api/r2rMuSubmissions/:id
// @acess Privet
export async function DELETE(req, context) {
  const { params } = context;
  connectMongoDB();
  const r2rMuSubmissions = await R2rMuSubmission.findById(params.slug);
  if (r2rMuSubmissions) {
    await r2rMuSubmissions.deleteOne();
    return Response.json({ message: 'R2rMuSubmission removed' });
  } else {
    return Response.json(
      { message: 'R2rMuSubmission not found' },
      { status: 404 },
    );
  }
}
