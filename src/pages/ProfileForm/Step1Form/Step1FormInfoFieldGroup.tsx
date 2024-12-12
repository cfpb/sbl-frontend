import useSblAuth from 'api/useSblAuth';
import FieldGroup from 'components/FieldGroup';
import InputEntry from 'components/InputEntry';
import { Link } from 'components/Link';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { BasicInfoSchema, ValidationSchema } from 'types/formTypes';

// TODO: Refactor to take a generic and pass these TS schemas in
type FormSchema = BasicInfoSchema | ValidationSchema;

interface Step1FormInfoFieldGroupProperties {
  register: UseFormRegister<FormSchema>;
  formErrors: FieldErrors<FormSchema>;
}

function Step1FormInfoFieldGroup({
  register,
  formErrors,
}: Step1FormInfoFieldGroupProperties): JSX.Element {
  const { emailAddress } = useSblAuth();
  return (
    <div className='mb-[3.75rem]'>
      <FieldGroup>
        <p className='mb-[1.875rem] text-grayDarker'>
          The Consumer Financial Protection Bureau (CFPB) is collecting data to
          test the functionality of the Small Business Lending Data Filing
          Platform. <Link href='/privacy-notice'>View Privacy Notice</Link>
        </p>
        <div className='mb-[1.875rem]'>
          <InputEntry
            label='First name'
            id='firstName'
            {...register('firstName')}
            errorMessage={formErrors.firstName?.message}
            showError
          />
          <InputEntry
            label='Last name'
            id='lastName'
            {...register('lastName')}
            errorMessage={formErrors.lastName?.message}
            showError
          />
        </div>
        <InputEntry
          label='Email address'
          id='email'
          type='email'
          className='snapshot-ignore'
          {...register('email')}
          errorMessage={formErrors.email?.message}
          showError
          isDisabled
          isLast
          hideInput
        >
          {emailAddress}
        </InputEntry>
      </FieldGroup>
    </div>
  );
}

export default Step1FormInfoFieldGroup;
