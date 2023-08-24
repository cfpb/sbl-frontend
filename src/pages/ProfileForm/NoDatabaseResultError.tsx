import ErrorIcon from 'components/ErrorIcon';
import { Link } from 'design-system-react';

function NoDatabaseResultError(): JSX.Element {
  return (
    <div className="flex flex-row gap-2">
      <ErrorIcon />
      <div className=''>
        <p className='text'>The financial institution/LEI you search for was not found in our database. If you recently registered for an LEI with GLEIF, your registration may still be in process. if you need further assistance please <Link href="#">submit a technical question</Link> to our help desk.
        </p>
      </div>
    </div>
  )
}

export default NoDatabaseResultError;