import connectMongoDB from '@/config/connectMongoDB.js';
import R2rMuSubmission from '@/models/r2rMuSubmissionModel.js';
import { admin, protect } from '@/middleware/authMiddleware';
import filehandler from '@/lib/filehandler';
// @desc Get all r2rMuSubmissions
// @route GET api/r2rMuSubmissions
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
  const count = await R2rMuSubmission.countDocuments({ ...keywords });
  const apiFunction = R2rMuSubmission.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });
  if (req.nextUrl.searchParams.get('select')) {
    apiFunction.select(req.nextUrl.searchParams.get('select'));
  }
  const r2rMuSubmissions = await apiFunction.exec();
  return Response.json({
    r2rMuSubmissions,
    page,
    pages: Math.ceil(count / pageSize),
  });
}
// @desc Post r2rMuSubmission
// @route POST api/r2rMuSubmissions
// @acess Privet
export async function POST(req, context) {
  connectMongoDB();
  const r2rMuSubmission = {};
  // start if
  if (r2rMuSubmission) {
    // convert to js object
    const body = await req.formData();
    if (body.get('choosenUsers')) {
      r2rMuSubmission['choosenUsers'] = JSON.parse(body.get('choosenUsers'));
    }
    if (body.get('labid')) {
      r2rMuSubmission['labid'] = body.get('labid');
    }
    const createdR2rMuSubmission = await R2rMuSubmission.create({
      ...r2rMuSubmission,
    });
    return Response.json({ ...createdR2rMuSubmission._doc });
    // end if
  } else {
    return Response.json(
      { message: 'R2rMuSubmission not found' },
      { status: 404 },
    );
  }
}
