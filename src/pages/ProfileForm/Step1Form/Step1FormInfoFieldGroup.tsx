import useSblAuth from 'api/useSblAuth';
import FieldGroup from 'components/FieldGroup';
import InputEntry from 'components/InputEntry';
import { Paragraph } from 'design-system-react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { BasicInfoSchema, ValidationSchema } from '../types';

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
        <div className='mb-[1.875rem]'>
          <InputEntry
            label='First name'
            id='firstName'
            {...register('firstName')}
            error={formErrors.firstName}
            isDisabled={false}
          />
          <InputEntry
            label='Last name'
            id='lastName'
            {...register('lastName')}
            error={formErrors.lastName}
            isDisabled={false}
          />
        </div>
        <InputEntry
          label='Email address'
          id='email'
          {...register('email')}
          error={formErrors.email}
          isDisabled
          isLast
          hideInput
        >
          <Paragraph className='mb-0'>{emailAddress}</Paragraph>
        </InputEntry>
      </FieldGroup>
    </div>
  );
}

export default Step1FormInfoFieldGroup;
