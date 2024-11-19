import { Link } from 'components/Link';

export function LinkContactSupport(): JSX.Element {
  return (
    <Link
      className='a-link a-link__jump mt-2 inline-block'
      href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Error page: Encountered an error on the platform'
    >
      <span className='a-link_text'>Email our support staff</span>
    </Link>
  );
}

export function LinkVisitHomepage({
  // Part of evaluation for linter issues see: https://github.com/cfpb/sbl-frontend/issues/1039
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...properties
}): JSX.Element {
  return (
    <a href='/' className='a-btn a-btn__full-on-xs visit-homepage'>
      Visit homepage
    </a>
  );
}
