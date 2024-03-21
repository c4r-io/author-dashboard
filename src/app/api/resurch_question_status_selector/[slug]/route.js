import connectMongoDB from '@/config/connectMongoDB.js';
import ResurchQuestionStatusSelector from '@/models/resurchQuestionStatusSelectorModel.js';
import { admin, protect } from '@/middleware/authMiddleware';
import filehandler from '@/lib/filehandler';
// @desc Get resurchQuestionStatusSelector by id
// @route GET api/resurchQuestionStatusSelectors/:id
// @acess Privet
export async function GET(req, context) {
  // if (
  //   !(await protect(req))
  // ) {
  //   return Response.json({ mesg: "Not authorized" })
  // }
  const { params } = context;
  connectMongoDB();
  const apiFunction = ResurchQuestionStatusSelector.findById(params.slug);
  if (req.nextUrl.searchParams.get('select')) {
    apiFunction.select(req.nextUrl.searchParams.get('select'));
  }
  const resurchQuestionStatusSelectors = await apiFunction.exec();
  return Response.json({ resurchQuestionStatusSelectors });
}
// @desc Put resurchQuestionStatusSelector
// @route PUT api/resurchQuestionStatusSelectors/:id
// @acess Privet
export async function PUT(req, context) {
  if (!(await protect(req))) {
    return Response.json({ mesg: 'Not authorized' });
  }
  const { params } = context;
  connectMongoDB();
  const resurchQuestionStatusSelector =
    await ResurchQuestionStatusSelector.findById(params.slug);
  // start if
  if (resurchQuestionStatusSelector) {
    // convert to js object
    const body = await req.formData();
    if (body.get('status_1')) {
      resurchQuestionStatusSelector.status_1 = body.get('status_1');
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
      resurchQuestionStatusSelector.status_1Image = filename;
    }
    if (body.get('status_2')) {
      resurchQuestionStatusSelector.status_2 = body.get('status_2');
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
      resurchQuestionStatusSelector.status_2Image = filename;
    }
    if (body.get('status_3')) {
      resurchQuestionStatusSelector.status_3 = body.get('status_3');
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
      resurchQuestionStatusSelector.status_3Image = filename;
    }
    const updatedResurchQuestionStatusSelector =
      await resurchQuestionStatusSelector.save();
    return Response.json({ ...updatedResurchQuestionStatusSelector._doc });
    // end if
  } else {
    return Response.json(
      { message: 'ResurchQuestionStatusSelector not found' },
      { status: 404 },
    );
  }
}
// @desc Delete resurchQuestionStatusSelector by id
// @route DELETE api/resurchQuestionStatusSelectors/:id
// @acess Privet
export async function DELETE(req, context) {
  const { params } = context;
  connectMongoDB();
  const resurchQuestionStatusSelectors =
    await ResurchQuestionStatusSelector.findById(params.slug);
  if (resurchQuestionStatusSelectors) {
    //filehandler.deleteFile(resurchQuestionStatusSelectors.status_1Image)
    //filehandler.deleteFile(resurchQuestionStatusSelectors.status_2Image)
    //filehandler.deleteFile(resurchQuestionStatusSelectors.status_3Image)
    await resurchQuestionStatusSelectors.deleteOne();
    return Response.json({ message: 'ResurchQuestionStatusSelector removed' });
  } else {
    return Response.json(
      { message: 'ResurchQuestionStatusSelector not found' },
      { status: 404 },
    );
  }
}
