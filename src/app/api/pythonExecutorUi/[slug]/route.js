import connectMongoDB from '@/config/connectMongoDB.js';
import PythonExecutorUi from '@/models/pythonExecutorUiModel.js';
import { admin, protect } from '@/middleware/authMiddleware';
import filehandler from '@/lib/filehandler';
// @desc Get pythonExecutorUi by id
// @route GET api/pythonExecutorUis/:id
// @acess Privet
export async function GET(req, context) {
  // if (
  //   !(await protect(req))
  // ) {
  //   return Response.json({ mesg: "Not authorized" })
  // }
  const { params } = context;
  connectMongoDB();
  const apiFunction = PythonExecutorUi.findById(params.slug);
  if (req.nextUrl.searchParams.get('select')) {
    apiFunction.select(req.nextUrl.searchParams.get('select'));
  }
  const pythonExecutorUis = await apiFunction.exec();
  return Response.json({ pythonExecutorUis });
}
// @desc Put pythonExecutorUi
// @route PUT api/pythonExecutorUis/:id
// @acess Privet
export async function PUT(req, context) {
  if (!(await protect(req))) {
    return Response.json({ mesg: 'Not authorized' });
  }
  const { params } = context;
  connectMongoDB();
  const pythonExecutorUi = await PythonExecutorUi.findById(params.slug);
  // start if
  if (pythonExecutorUi) {
    // convert to js object
    const body = await req.formData();
    if (body.get('headerTitle')) {
      pythonExecutorUi.headerTitle = body.get('headerTitle');
    }
    if (body.get('headerContent')) {
      pythonExecutorUi.headerContent = body.get('headerContent');
    }
    if (body.get('headerFooter')) {
      pythonExecutorUi.headerFooter = body.get('headerFooter');
    }
    const updatedPythonExecutorUi = await pythonExecutorUi.save();
    return Response.json({ ...updatedPythonExecutorUi._doc });
    // end if
  } else {
    return Response.json(
      { message: 'PythonExecutorUi not found' },
      { status: 404 },
    );
  }
}
// @desc Delete pythonExecutorUi by id
// @route DELETE api/pythonExecutorUis/:id
// @acess Privet
export async function DELETE(req, context) {
  const { params } = context;
  connectMongoDB();
  const pythonExecutorUis = await PythonExecutorUi.findById(params.slug);
  if (pythonExecutorUis) {
    await pythonExecutorUis.deleteOne();
    return Response.json({ message: 'PythonExecutorUi removed' });
  } else {
    return Response.json(
      { message: 'PythonExecutorUi not found' },
      { status: 404 },
    );
  }
}
