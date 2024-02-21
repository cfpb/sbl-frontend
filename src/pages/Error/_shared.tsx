import { Link } from 'components/Link';

export function LinkContactSupport(): JSX.Element {
  return (
    <Link
      className='a-link a-link__jump mt-2 inline-block'
      href='https://sblhelp.consumerfinance.gov/'
    >
      <span className='a-link_text'>Contact our support staff</span>
    </Link>
  );
}

export function LinkVisitHomepage(): JSX.Element {
  return (
    <Link href='/' className='a-btn a-btn__full-on-xs visit-homepage'>
      Visit platform homepage
    </Link>
  );
}
