/* eslint-disable jsx-a11y/label-has-associated-control */

import { zodResolver } from '@hookform/resolvers/zod';
import useSblAuth from 'api/useSblAuth';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Element } from 'react-scroll';

import FieldGroup from 'components/FieldGroup';
import SectionIntro from 'components/SectionIntro';
import AssociatedFinancialInstitutions from './AssociatedFinancialInstitutions';
import NoDatabaseResultError from './NoDatabaseResultError';

import { Button } from 'design-system-react';

import FormButtonGroup from 'components/FormButtonGroup';

import FormErrorHeader from 'components/FormErrorHeader';
import type {
  FinancialInstitutionRS,
  InstitutionDetailsApiCheckedType,
  InstitutionDetailsApiType,
  ValidationSchema,
} from 'types/formTypes';
import { validationSchema } from 'types/formTypes';

import { useQuery } from '@tanstack/react-query';
import type { CupFormHeaderErrorsType } from 'components/FormErrorHeader.data';
import { CupFormHeaderErrors } from 'components/FormErrorHeader.data';

import { fetchInstitutions } from 'api/requests';
import FormMain from 'components/FormMain';
import FormWrapper from 'components/FormWrapper';
import {
  formatDataCheckedState,
  formatUserProfileObject,
  scrollToElement,
} from 'pages/ProfileForm/ProfileFormUtils';
import { One } from 'utils/constants';
import { normalKeyLogic } from 'utils/getFormErrorKeyLogic';
import Step1FormHeader from './Step1FormHeader';
import Step1FormInfoFieldGroup from './Step1FormInfoFieldGroup';
import Step1FormInfoHeader from './Step1FormInfoHeader';

import CrumbTrail from 'components/CrumbTrail';
import { Link } from 'components/Link';
import { useNavigate } from 'react-router-dom';
import useSubmitUserProfile from 'utils/useSubmitUserProfile';

function Step1Form(): JSX.Element {
  // const queryClient = useQueryClient();
  /* Initial- Fetch all institutions */
  const auth = useSblAuth();

  const email = auth.user?.profile.email;
  // eslint-disable-next-line unicorn/prefer-string-slice
  const emailDomain = email?.substring(email.lastIndexOf('@') + One);
  const {
    isLoading,
    isError,
    data: afData,
  } = useQuery({
    queryKey: ['fetch-institutions', emailDomain],
    queryFn: async () => fetchInstitutions(auth, emailDomain),
    enabled: !!emailDomain,
  });

  const defaultValues: ValidationSchema = {
    firstName: '',
    lastName: '',
    email: email ?? '',
    financialInstitutions: [],
  };

  const {
    register,
    setValue,
    trigger,
    getValues,
    formState: { errors: formErrors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  /* Selected State - Start */
  // Associated Financial Institutions state
  const [checkedListState, setCheckedListState] = useState<
    InstitutionDetailsApiCheckedType[]
  >([]);

  useEffect(() => {
    if (afData) {
      const dataCheckedState = formatDataCheckedState(afData);
      setCheckedListState(dataCheckedState);
    }
  }, [afData]);

  // Dropdown -- Financial Institutions state
  const [selectedFI, setSelectedFI] = useState<FinancialInstitutionRS[]>([]);
  /* Selected State - End */

  const getFinancialInstitutionsFormData = useCallback(
    (
      checkedListStateArray: InstitutionDetailsApiCheckedType[],
    ): InstitutionDetailsApiType[] => {
      const newFinancialInstitutions: InstitutionDetailsApiType[] = [];

      for (const object of checkedListStateArray) {
        if (object.checked) {
          // ts-expect-error TS error due to using Zod infer
          // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
          const foundObject: InstitutionDetailsApiType = afData.find(
            institutionsObject => object.lei === institutionsObject.lei,
          );
          newFinancialInstitutions.push(foundObject);
        }
      }

      // TODO: Added multiselected to list of selected institutions

      // selectedFI.forEach( (objectRS: FinancialInstitutionRS) => {
      //   const found = fiData.find(object => object.lei === objectRS.value);
      //   if (found) {
      //     newFinancialInstitutions.push(found);
      //   }
      // } );
      return newFinancialInstitutions;
    },
    [afData],
  );

  useEffect(() => {
    const checkedFinancialInstitutions =
      getFinancialInstitutionsFormData(checkedListState);
    setValue('financialInstitutions', checkedFinancialInstitutions);
  }, [
    checkedListState,
    selectedFI,
    getFinancialInstitutionsFormData,
    setValue,
  ]);
  /* Format - End */

  const navigate = useNavigate();

  // 'Clear Form' function
  function onClearForm(): void {
    setValue('firstName', '');
    setValue('lastName', '');
    setSelectedFI([]);
    setCheckedListState(formatDataCheckedState(afData));
    scrollToElement('firstName');
  }

  // Used for error scrolling
  const formErrorHeaderId = 'step1FormErrorHeader';

  const { mutateAsync: mutateSubmitUserProfile } = useSubmitUserProfile();

  // Post Submission
  const onSubmitButtonAction = async (): Promise<void> => {
    // TODO: Handle error UX on submission failure or timeout
    const userProfileObject = getValues();
    const passesValidation = await trigger();
    if (passesValidation) {
      const formattedUserProfileObject = formatUserProfileObject(
        userProfileObject,
        true,
      );
      await mutateSubmitUserProfile({
        userProfileObject: formattedUserProfileObject,
      });
      navigate('/landing');
    } else {
      // on errors scroll to Step1FormErrorHeader
      scrollToElement(formErrorHeaderId);
    }
  };

  // Based on useQuery states
  if (!auth.user?.access_token) return <>Login first</>;
  if (isLoading) return <>Loading</>;
  if (isError) return <>Error loading institutions</>;

  return (
    <div id='step1form'>
      <FormWrapper isMarginTop={false}>
        <CrumbTrail>
          <Link href='/'>Home</Link>
        </CrumbTrail>
        <Step1FormHeader isStep1 />
        <FormErrorHeader<ValidationSchema, CupFormHeaderErrorsType>
          errors={formErrors}
          id={formErrorHeaderId}
          formErrorHeaderObject={CupFormHeaderErrors}
          keyLogicFunc={normalKeyLogic}
        />
        <Step1FormInfoHeader />
        {/* @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717 */}
        <FormMain>
          <Step1FormInfoFieldGroup
            formErrors={formErrors}
            register={register}
          />
          <Element name='financialInstitutions'>
            <SectionIntro heading='Select the institution for which you are authorized to file'>
              If there are any matches between your email domain and the email
              domain of a financial institution in our database you will see
              those matches below.
            </SectionIntro>
            <FieldGroup>
              <AssociatedFinancialInstitutions
                errors={formErrors}
                checkedListState={checkedListState}
                setCheckedListState={setCheckedListState}
              />
            </FieldGroup>
            {/* TODO: The below error occurs if the 'Get All Financial Instituions' fetch fails or fetches empty data */}
            {/* @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717 */}
            {formErrors.fiData ? <NoDatabaseResultError /> : null}
          </Element>
          <FormButtonGroup>
            <Button
              appearance='primary'
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={onSubmitButtonAction}
              label='Submit'
              aria-label='Submit User Profile'
              size='default'
              type='button'
            />
            <Button
              label='Clear form'
              onClick={onClearForm}
              appearance='warning'
              asLink
            />
          </FormButtonGroup>
        </FormMain>
      </FormWrapper>
    </div>
  );
}

export default Step1Form;
