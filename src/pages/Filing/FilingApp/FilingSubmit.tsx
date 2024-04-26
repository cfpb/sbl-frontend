import {
  Alert,
  Button,
  Checkbox,
  Grid,
  TextIntroduction,
} from 'design-system-react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFilingAndSubmissionInfo } from 'utils/useFilingAndSubmissionInfo';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import useUserProfile from 'utils/useUserProfile';
import { AffiliateInformation } from '../ViewInstitutionProfile/AffiliateInformation';
import { FinancialInstitutionDetails } from '../ViewInstitutionProfile/FinancialInstitutionDetails';
import { IdentifyingInformation } from '../ViewInstitutionProfile/IdentifyingInformation';
import { FilingSteps } from './FilingSteps';
import {
  FileInformation,
  PointOfContactConfirm,
  SignCertify,
} from './FilingSubmit.helpers';

const initState = {
  institution: false,
  affiliate: false,
  identifying: false,
  poc: false,
  file: false,
  certify: false,
};

const isSubmitEnabled = (checkboxValues: typeof initState): boolean =>
  checkboxValues.institution &&
  checkboxValues.affiliate &&
  checkboxValues.identifying &&
  checkboxValues.poc &&
  checkboxValues.file &&
  checkboxValues.certify;

export function FilingSubmit(): JSX.Element {
  const { lei, year } = useParams();
  const [checkboxValues, setCheckboxValues] = useState({ ...initState });

  const {
    isError: userError,
    isLoading: userLoading,
    data: user,
  } = useUserProfile();

  const {
    data: institution,
    isLoading: institutionLoading,
    isError: institutionError,
  } = useInstitutionDetails(lei);

  const {
    filing,
    submission,
    isLoading: filingLoading,
    error,
  } = useFilingAndSubmissionInfo({
    lei,
    filingPeriod: year,
  });

  if (filingLoading || institutionLoading || userLoading)
    return <div>Loading...</div>;

  if (error || userError || institutionError)
    return (
      <>
        <Alert status='error' message={userError} isVisible={!!userError} />
        <Alert
          status='error'
          message={institutionError}
          isVisible={!!institutionError}
        />
        <Alert status='error' message={error} isVisible={!!error} />
      </>
    );

  const onCheckboxUpdate =
    (id: string) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setCheckboxValues({ ...checkboxValues, [id]: event.target.checked });
    };

  const onClear = (): void => setCheckboxValues({ ...initState });

  return (
    <>
      <FilingSteps />
      <Grid.Wrapper center>
        <Grid.Row>
          <Grid.Column width={8} className='u-mt15'>
            <TextIntroduction
              heading='Sign and submit'
              subheading='Before you sign and submit, carefully review all the information provided in each of the following sections. For each section, check the box if the information is complete and accurate, or follow the instructions to make changes.'
              description='An authorized representative of your financial institution with knowledge of the data must certify the accuracy and completeness of the data reported pursuant to § 1002.109(a)(1)(ii).'
            />
            <FinancialInstitutionDetails
              heading='Confirm financial institution details'
              data={institution}
              isDomainsVisible={false}
            />
            <div className='u-mt30'>
              <Checkbox
                id='fi-details'
                label='Check box action so a user can confirm that details are correct'
                checked={checkboxValues.institution}
                onChange={onCheckboxUpdate('institution')}
              />
            </div>

            <IdentifyingInformation
              heading='Confirm identifying information'
              data={institution}
            />
            <div className='u-mt30'>
              <Checkbox
                id='identifying-info'
                label='Check box action so a user can confirm that details are correct'
                checked={checkboxValues.identifying}
                onChange={onCheckboxUpdate('identifying')}
              />
            </div>

            <AffiliateInformation
              heading='Update your parent entity information'
              data={institution}
            />
            <div className='u-mt30'>
              <Checkbox
                id='affiliate-info'
                label='Check box action so a user can confirm that details are correct'
                checked={checkboxValues.affiliate}
                onChange={onCheckboxUpdate('affiliate')}
              />
            </div>

            <PointOfContactConfirm data={filing} />
            <div className='u-mt30'>
              <Checkbox
                id='poc'
                label='Check box action so a user can confirm that details are correct'
                checked={checkboxValues.poc}
                onChange={onCheckboxUpdate('poc')}
              />
            </div>

            <FileInformation data={submission} />
            <div className='u-mt30'>
              <Checkbox
                id='file-info'
                label='Check box action so a user can confirm that details are correct'
                checked={checkboxValues.file}
                onChange={onCheckboxUpdate('file')}
              />
            </div>

            <SignCertify
              name={user.name.length > 0 ? user.name : user.email}
              onChange={onCheckboxUpdate('certify')}
              value={checkboxValues.certify}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} className='u-mt15'>
            <Button
              label='Submit filing'
              type='submit'
              onClick={onClear}
              className='mr-5'
              disabled={!isSubmitEnabled(checkboxValues)}
            />
            <Button
              label='Clear form'
              asLink
              onClick={onClear}
              appearance='warning'
            />
          </Grid.Column>
        </Grid.Row>
      </Grid.Wrapper>
    </>
  );
}

export default FilingSubmit;
