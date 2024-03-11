import connectMongoDB from '@/config/connectMongoDB.js';
import R2rMuUi from '@/models/r2rMuUiModel';
import { admin, protect } from '@/middleware/authMiddleware';
import filehandler from '@/lib/filehandler';
// @desc Get all r2rMuUis
// @route GET api/r2rMuUis
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
  const count = await R2rMuUi.countDocuments({ ...keywords });
  const apiFunction = R2rMuUi.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });
  if (req.nextUrl.searchParams.get('select')) {
    apiFunction.select(req.nextUrl.searchParams.get('select'));
  }
  const r2rMuUis = await apiFunction.exec();
  return Response.json({
    r2rMuUis,
    page,
    pages: Math.ceil(count / pageSize),
  });
}
// @desc Post r2rMuUi
// @route POST api/r2rMuUis
// @acess Privet
export async function POST(req, context) {
  connectMongoDB();
  const r2rMuUi = {};
  // start if
  if (r2rMuUi) {
    // convert to js object
    const body = await req.formData();
    if (body.get('headerTitle')) {
      r2rMuUi['headerTitle'] = body.get('headerTitle');
    }
    if (body.get('headerContent')) {
      r2rMuUi['headerContent'] = body.get('headerContent');
    }
    if (body.get('headerFooter')) {
      r2rMuUi['headerFooter'] = body.get('headerFooter');
    }
    if (body.get('headerRaven')) {
      r2rMuUi['headerRaven'] = await filehandler.saveFileAsBinary(body.get('headerRaven'));
    }
    if (body.get('wheelHeaderText')) {
      r2rMuUi['wheelHeaderText'] = body.get('wheelHeaderText');
    }
    if (body.get('wheelFooterText')) {
      r2rMuUi['wheelFooterText'] = body.get('wheelFooterText');
    }

    if (body.get('wheelFooterToggleButtonText1')) {
      r2rMuUi['wheelFooterToggleButtonText1'] = body.get('wheelFooterToggleButtonText1');
    }
    if (body.get('wheelFooterToggleButtonText2')) {
      r2rMuUi['wheelFooterToggleButtonText2'] = body.get('wheelFooterToggleButtonText2');
    }
    if (body.get('wheelDonePickingText')) {
      r2rMuUi['wheelDonePickingText'] = body.get('wheelDonePickingText');
    }
    if (body.get('wheelDoneRechooseButtonText')) {
      r2rMuUi['wheelDoneRechooseButtonText'] = body.get('wheelDoneRechooseButtonText');
    }
    if (body.get('questionToUserText')) {
      r2rMuUi['questionToUserText'] = body.get('questionToUserText');
    }
    if (body.get('questionToUserRaven')) {
      r2rMuUi['questionToUserRaven'] = body.get('questionToUserRaven');
    }
    if (body.get('questionToUserButtonText')) {
      r2rMuUi['questionToUserButtonText'] = body.get('questionToUserButtonText');
    }
    if (body.get('greatJobText')) {
      r2rMuUi['greatJobText'] = body.get('greatJobText');
    }
    if (body.get('greatJobRaven')) {
      r2rMuUi['greatJobRaven'] = body.get('greatJobRaven');
    }
    if (body.get('considerThisText')) {
      r2rMuUi['considerThisText'] = body.get('considerThisText');
    }
    if (body.get('closingScreenText')) {
      r2rMuUi['closingScreenText'] = body.get('closingScreenText');
    }
    if (body.get('nextScreenButtonText')) {
      r2rMuUi['nextScreenButtonText'] = body.get('nextScreenButtonText');
    }
    const createdR2rMuUi = await R2rMuUi.create({
      ...r2rMuUi,
    });
    return Response.json({ ...createdR2rMuUi._doc });
    // end if
  } else {
    return Response.json(
      { message: 'R2rMuUi not found' },
      { status: 404 },
    );
  }
}
