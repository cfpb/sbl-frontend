import { Link, TextIntroduction } from 'design-system-react';

/**
 *
 * @returns Header for Step1Form
 */
function Step1FormHeader(): JSX.Element {
  return (
    <div className='mb-[45px] max-w-[670px]'>
      {/* TODO: Replace with TextIntroduction component */}
      <h1 className=''>Complete your user profile</h1>
      <p className='lead-paragraph'>
        Indicate the financial institution you are authorized to file for to
        complete your user profile. Once you have successfully associated your
        user profile with a financial institution you will have access to the
        filing platform and can begin the filing process.
      </p>
      <p className='mb-[30px]'>
        In order to begin using the filing platform you must have a Legal Entity
        identifier (LEI) for your financial institution. Visit the{' '}
        <Link href='#'>Global LEI Foundation (GLEIF)</Link> website for more
        information on how to obtain an LEI.
      </p>
      <p />
    </div>
  );
}

export default Step1FormHeader;
