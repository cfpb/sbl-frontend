import { Button, Alert } from 'design-system-react';
import type { ReactNode } from 'react';

type ButtonProps = ComponentProps<typeof Button>;

type ButtonLoaderErrorProps = {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: ReactNode;
};

type ButtonCombinedProps = ButtonProps & ButtonLoaderErrorProps;

export function ButtonLoaderError({
  isLoading = false,
  hasError = false,
  errorMessage = 'Action failed.',
  ...other
}: ButtonCombinedProps): JSX.Element {
  return (
    <>
      <div className='mb-[0.9375rem]'>
        <Button
          appearance='primary'
          size='default'
          type='button'
          iconRight={`${isLoading ? "updating" : ''}`}
          disabled={ (isLoading || hasError) ? true : false}
          {...other}
        /> 
      </div>
      {
        hasError ? 
        <Alert
          isFieldLevel
          status='error'
          message={errorMessage}
          showIcon={false}
        />
        : null
      }
      
    </>
  );
}

export default ButtonLoaderError;
