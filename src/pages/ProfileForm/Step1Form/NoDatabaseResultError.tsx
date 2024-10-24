import { Link } from 'components/Link';
import { AlertFieldLevel, Paragraph } from 'design-system-react';

function NoDatabaseResultError(): JSX.Element {
  return (
    <div className='mt-[0.9375rem] flex flex-row gap-2'>
      <AlertFieldLevel
        message={
          <Paragraph>
            The financial institution/LEI you searched for was not found in our
            database. If you recently registered for an LEI with GLEIF, your
            registration may still be in process. If you need further assistance
            please{' '}
            <Link href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Complete your user profile: Error when no institutions found'>
              email our support staff
            </Link>{' '}
            .
          </Paragraph>
        }
        status='error'
      />
    </div>
  );
}

export default NoDatabaseResultError;
