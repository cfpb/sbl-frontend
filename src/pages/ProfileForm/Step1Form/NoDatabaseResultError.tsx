import ErrorIcon from 'components/ErrorIcon';
import { Link } from 'design-system-react';

function NoDatabaseResultError(): JSX.Element {
  return (
    <div className='mt-[0.9375em] flex flex-row gap-2'>
      <ErrorIcon />
      <div className=''>
        <p className='-translate-y-[3%]'>
          The financial institution/LEI you searched for was not found in our
          database. If you recently registered for an LEI with GLEIF, your
          registration may still be in process. If you need further assistance
          please <Link href='#'>submit a technical question</Link> to our help
          desk.
        </p>
      </div>
    </div>
  );
}

export default NoDatabaseResultError;
