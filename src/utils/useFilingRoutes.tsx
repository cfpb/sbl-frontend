import FilingComplete from 'pages/Filing/FilingApp/FilingComplete';
import FilingContact from 'pages/Filing/FilingApp/FilingContact';
import FilingErrors from 'pages/Filing/FilingApp/FilingErrors';
import FilingSubmit from 'pages/Filing/FilingApp/FilingSubmit';
import FilingUpload from 'pages/Filing/FilingApp/FilingUpload';
import FilingWarnings from 'pages/Filing/FilingApp/FilingWarnings';
import { Route } from 'react-router-dom';

export const useFilingRoutes = (): JSX.Element => (
  <>
    <Route path='/filing/upload' element={<FilingUpload />} />
    <Route path='/filing/errors' element={<FilingErrors />} />
    <Route path='/filing/warnings' element={<FilingWarnings />} />
    <Route path='/filing/contact' element={<FilingContact />} />
    <Route path='/filing/submit' element={<FilingSubmit />} />
    <Route path='/filing/done' element={<FilingComplete />} />
  </>
);

export default { useFilingRoutes };
