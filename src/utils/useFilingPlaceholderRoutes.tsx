import {
  FilingStepWrapper,
  generateFilingObject,
} from 'pages/Filing/FilingApp/FilingRouting';
import { Route } from 'react-router-dom';
import { FilingStatus } from 'utils/types';

export const useFilingPlaceholderRoutes = (): JSX.Element => (
  <>
    <Route
      path='/filing/upload'
      element={
        <FilingStepWrapper
          heading='Filing - Upload'
          hrefPrevious='/filing'
          hrefNext='/filing/errors'
          currentFiling={generateFilingObject({
            status: FilingStatus.SUBMISSION_STARTED,
          })}
        />
      }
    />
    <Route
      path='/filing/errors'
      element={
        <FilingStepWrapper
          heading='Filing - Errors'
          hrefPrevious='/filing/upload'
          hrefNext='/filing/warnings'
          currentFiling={generateFilingObject({
            status: FilingStatus.VALIDATION_WITH_ERRORS,
          })}
        />
      }
    />
    <Route
      path='/filing/warnings'
      element={
        <FilingStepWrapper
          heading='Filing - Warnings'
          hrefPrevious='/filing/errors'
          hrefNext='/filing/contact'
          currentFiling={generateFilingObject({
            status: FilingStatus.VALIDATION_WITH_WARNINGS,
          })}
        />
      }
    />
    <Route
      path='/filing/contact'
      element={
        <FilingStepWrapper
          heading='Filing - Point of Contact'
          hrefPrevious='/filing/warnings'
          hrefNext='/filing/submit'
          currentFiling={generateFilingObject({
            status: FilingStatus.VALIDATION_WITH_WARNINGS,
            contact_info: true,
          })}
        />
      }
    />
    <Route
      path='/filing/submit'
      element={
        <FilingStepWrapper
          heading='Filing - Sign & Submit'
          hrefPrevious='/filing/contact'
          hrefNext='/filing/done'
          currentFiling={generateFilingObject({
            status: FilingStatus.VALIDATION_SUCCESSFUL,
            contact_info: true,
          })}
        />
      }
    />
    <Route
      path='/filing/done'
      element={
        <FilingStepWrapper
          heading='Filing - Complete'
          hrefPrevious='/filing/submit'
          currentFiling={generateFilingObject({
            status: FilingStatus.SUBMISSION_ACCEPTED,
            contact_info: true,
          })}
        />
      }
    />
  </>
);

export default { useFilingPlaceholderRoutes };
