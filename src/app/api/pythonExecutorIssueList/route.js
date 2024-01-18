import connectMongoDB from '@/config/connectMongoDB.js';
import PythonExecutorIssueList from '@/models/pythonExecutorIssueListModel.js';
import { admin, protect } from '@/middleware/authMiddleware';
// @desc Get all pythonExecutorIssueLists
// @route GET api/pythonExecutorIssueLists
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
  const count = await PythonExecutorIssueList.countDocuments({ ...keywords });
  const apiFunction = PythonExecutorIssueList.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });
  if (req.nextUrl.searchParams.get('select')) {
    apiFunction.select(req.nextUrl.searchParams.get('select'));
  }
  const pythonExecutorIssueLists = await apiFunction.exec();
  return Response.json({
    pythonExecutorIssueLists,
    page,
    pages: Math.ceil(count / pageSize),
  });
}
// @desc Post pythonExecutorIssueList
// @route POST api/pythonExecutorIssueLists
// @acess Privet
export async function POST(req) {
  if (!(await protect(req))) {
    return Response.json({ mesg: 'Not authorized' });
  }
  const body = await req.formData();
  connectMongoDB();
  const pythonExecutorIssueData = {}
  if (body.get('description')) {
    pythonExecutorIssueData["description"] = body.get('description');
  }
  if (
    body.get('attachment') &&
    pythonExecutorIssueData["attachment"] !== body.get('attachment')
  ) {
    const filename = await filehandler.saveFileAsBinary(body.get('attachment'));
    // filehandler.deleteFile(pythonExecutorIssueList.attachment);
    pythonExecutorIssueData["attachment"] = filename;
  }
  const createdpythonExecutorIssueList = await PythonExecutorIssueList.create({
    ...pythonExecutorIssueData
  });
  return Response.json({ ...createdpythonExecutorIssueList._doc });
}
