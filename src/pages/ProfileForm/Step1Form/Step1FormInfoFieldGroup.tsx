import useSblAuth from 'api/useSblAuth';
import FieldGroup from 'components/FieldGroup';
import InputEntry from 'components/InputEntry';
import { Paragraph } from 'design-system-react';
import type { UseFormRegister } from 'react-hook-form';
import type { ValidationSchema } from '../types';

interface Step1FormInfoFieldGroupProperties {
  register: UseFormRegister<ValidationSchema>;
  formErrors: object;
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
            errors={formErrors}
            isDisabled={false}
          />
          <InputEntry
            label='Last name'
            id='lastName'
            {...register('lastName')}
            errors={formErrors}
            isDisabled={false}
          />
        </div>
        <InputEntry
          label='Email address'
          id='email'
          {...register('email')}
          errors={formErrors}
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
