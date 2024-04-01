import { Link } from 'components/Link';

export function LinkContactSupport(): JSX.Element {
  return (
    <Link
      className='a-link a-link__jump mt-2 inline-block'
      href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Error page: Encountered an error on the SBL Platform'
    >
      <span className='a-link_text'>Email our support staff</span>
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
