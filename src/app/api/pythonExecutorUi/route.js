import connectMongoDB from '@/config/connectMongoDB.js';
import PythonExecutorUi from '@/models/pythonExecutorUiModel.js';
import { admin, protect } from '@/middleware/authMiddleware';
// @desc Get all pythonExecutorUis
// @route GET api/pythonExecutorUis
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
  const count = await PythonExecutorUi.countDocuments({ ...keywords });
  const apiFunction = PythonExecutorUi.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });
  if (req.nextUrl.searchParams.get('select')) {
    apiFunction.select(req.nextUrl.searchParams.get('select'));
  }
  const pythonExecutorUis = await apiFunction.exec();
  return Response.json({
    pythonExecutorUis,
    page,
    pages: Math.ceil(count / pageSize),
  });
}
// @desc Post pythonExecutorUi
// @route POST api/pythonExecutorUis
// @acess Privet
export async function POST(req) {
  if (!(await protect(req))) {
    return Response.json({ mesg: 'Not authorized' });
  }
  const body = await req.json();
  connectMongoDB();
  const createdpythonExecutorUi = await PythonExecutorUi.create({
    headerTitle: body.headerTitle,
    headerContent: body.headerContent,
    headerFooter: body.headerFooter,
  });
  return Response.json({ ...createdpythonExecutorUi._doc });
}
