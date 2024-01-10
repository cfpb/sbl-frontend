import { Link, AlertFieldLevel } from 'design-system-react';
import { sblHelpLink } from 'utils/common';

function NoDatabaseResultError(): JSX.Element {
  return (
    <div className='mt-[0.9375em] flex flex-row gap-2'>
      <AlertFieldLevel
    message={<>The financial institution/LEI you searched for was not found in our
          database. If you recently registered for an LEI with GLEIF, your
          registration may still be in process. If you need further assistance
          please <Link href={sblHelpLink}>submit a technical question</Link> to our help
          desk.</>}
    status="error"
  />
    </div>
  );
}

export default NoDatabaseResultError;
