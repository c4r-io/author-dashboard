import connectMongoDB from '@/config/connectMongoDB.js';
import ResurchQuestionStatusSelector from '@/models/resurchQuestionStatusSelectorModel.js';
import { admin, protect } from '@/middleware/authMiddleware';
import filehandler from '@/lib/filehandler';
// @desc Get all resurchQuestionStatusSelectors
// @route GET api/resurchQuestionStatusSelectors
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
  const count = await ResurchQuestionStatusSelector.countDocuments({
    ...keywords,
  });
  const apiFunction = ResurchQuestionStatusSelector.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });
  if (req.nextUrl.searchParams.get('select')) {
    apiFunction.select(req.nextUrl.searchParams.get('select'));
  }
  const resurchQuestionStatusSelectors = await apiFunction.exec();
  return Response.json({
    resurchQuestionStatusSelectors,
    page,
    pages: Math.ceil(count / pageSize),
  });
}
// @desc Post resurchQuestionStatusSelector
// @route POST api/resurchQuestionStatusSelectors
// @acess Privet
export async function POST(req, context) {
  connectMongoDB();
  const resurchQuestionStatusSelector = {};
  // start if
  if (resurchQuestionStatusSelector) {
    // convert to js object
    const body = await req.formData();
    if (body.get('status_1')) {
      resurchQuestionStatusSelector['status_1'] = body.get('status_1');
    }
    if (
      body.get('status_1Image') &&
      resurchQuestionStatusSelector.status_1Image !== body.get('status_1Image')
    ) {
      const filename = await filehandler.saveFileAsBinary(
        body.get('status_1Image'),
      );
      // const filename = await filehandler.saveFile(body.get("status_1Image"))
      // filehandler.deleteFile(resurchQuestionStatusSelector.status_1Image)
      resurchQuestionStatusSelector['status_1Image'] = filename;
    }
    if (body.get('status_2')) {
      resurchQuestionStatusSelector['status_2'] = body.get('status_2');
    }
    if (
      body.get('status_2Image') &&
      resurchQuestionStatusSelector.status_2Image !== body.get('status_2Image')
    ) {
      const filename = await filehandler.saveFileAsBinary(
        body.get('status_2Image'),
      );
      // const filename = await filehandler.saveFile(body.get("status_2Image"))
      // filehandler.deleteFile(resurchQuestionStatusSelector.status_2Image)
      resurchQuestionStatusSelector['status_2Image'] = filename;
    }
    if (body.get('status_3')) {
      resurchQuestionStatusSelector['status_3'] = body.get('status_3');
    }
    if (
      body.get('status_3Image') &&
      resurchQuestionStatusSelector.status_3Image !== body.get('status_3Image')
    ) {
      const filename = await filehandler.saveFileAsBinary(
        body.get('status_3Image'),
      );
      // const filename = await filehandler.saveFile(body.get("status_3Image"))
      // filehandler.deleteFile(resurchQuestionStatusSelector.status_3Image)
      resurchQuestionStatusSelector['status_3Image'] = filename;
    }
    const createdResurchQuestionStatusSelector =
      await ResurchQuestionStatusSelector.create({
        ...resurchQuestionStatusSelector,
      });
    return Response.json({ ...createdResurchQuestionStatusSelector._doc });
    // end if
  } else {
    return Response.json(
      { message: 'ResurchQuestionStatusSelector not found' },
      { status: 404 },
    );
  }
}
