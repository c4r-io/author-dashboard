import connectMongoDB from '@/config/connectMongoDB.js';
import PythonExecutorIssueList from '@/models/pythonExecutorIssueListModel.js';
import { admin, protect } from '@/middleware/authMiddleware';
import filehandler from '@/lib/filehandler';
// @desc Get pythonExecutorIssueList by id
// @route GET api/pythonExecutorIssueLists/:id
// @acess Privet
export async function GET(req, context) {
  // if (
  //   !(await protect(req))
  // ) {
  //   return Response.json({ mesg: "Not authorized" })
  // }
  const { params } = context;
  connectMongoDB();
  const apiFunction = PythonExecutorIssueList.findById(params.slug);
  if (req.nextUrl.searchParams.get('select')) {
    apiFunction.select(req.nextUrl.searchParams.get('select'));
  }
  const pythonExecutorIssueLists = await apiFunction.exec();
  return Response.json({ pythonExecutorIssueLists });
}
// @desc Put pythonExecutorIssueList
// @route PUT api/pythonExecutorIssueLists/:id
// @acess Privet
export async function PUT(req, context) {
  if (!(await protect(req))) {
    return Response.json({ mesg: 'Not authorized' });
  }
  const { params } = context;
  connectMongoDB();
  const pythonExecutorIssueList = await PythonExecutorIssueList.findById(
    params.slug,
  );
  // start if
  if (pythonExecutorIssueList) {
    // convert to js object
    const body = await req.formData();
    if (body.get('description')) {
      pythonExecutorIssueList.description = body.get('description');
    }
    if (
      body.get('attachment') &&
      pythonExecutorIssueList.attachment !== body.get('attachment')
    ) {
      const filename = await filehandler.saveFileAsBinary(body.get('attachment'));
      // filehandler.deleteFile(pythonExecutorIssueList.attachment);
      pythonExecutorIssueList.attachment = filename;
    }
    const updatedPythonExecutorIssueList = await pythonExecutorIssueList.save();
    return Response.json({ ...updatedPythonExecutorIssueList._doc });
    // end if
  } else {
    return Response.json(
      { message: 'PythonExecutorIssueList not found' },
      { status: 404 },
    );
  }
}
// @desc Delete pythonExecutorIssueList by id
// @route DELETE api/pythonExecutorIssueLists/:id
// @acess Privet
export async function DELETE(req, context) {
  const { params } = context;
  connectMongoDB();
  const pythonExecutorIssueLists = await PythonExecutorIssueList.findById(
    params.slug,
  );
  if (pythonExecutorIssueLists) {
    // filehandler.deleteFile(pythonExecutorIssueLists.attachment);
    await pythonExecutorIssueLists.deleteOne();
    return Response.json({ message: 'PythonExecutorIssueList removed' });
  } else {
    return Response.json(
      { message: 'PythonExecutorIssueList not found' },
      { status: 404 },
    );
  }
}
