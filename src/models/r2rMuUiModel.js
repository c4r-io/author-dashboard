import mongoose from 'mongoose';
const pythonExecutorUiSchema = mongoose.Schema(
  {
    headerTitle: {
      type: String,
    },
    headerContent: {
      type: String,
    },
    headerFooter: {
      type: String,
    },
    headerRaven: {
      type: Object,
    },
    wheelHeaderText: {
      type: String,
    },
    wheelFooterText: {
      type: String,
    },
    wheelFooterToggleButtonText1: {
      type: String,
    },
    wheelFooterToggleButtonText2: {
      type: String,
    },
    wheelDonePickingText: {
      type: String,
    },
    wheelDoneRechooseButtonText: {
      type: String,
    },
    questionToUserText: {
      type: String,
    },
    questionToUserRaven: {
      type: Object,
    },
    // questionToUserButtonText: {
    //   type: String,
    // },
    greatJobText: {
      type: String,
    },
    greatJobRaven: {
      type: Object,
    },
    considerThisText: {
      type: String,
    },
    closingScreenText: {
      type: String,
    },
    nextScreenButtonText: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const R2rMuUi =
  mongoose.models.R2rMuUi ||
  mongoose.model('R2rMuUi', pythonExecutorUiSchema);
export default R2rMuUi;
