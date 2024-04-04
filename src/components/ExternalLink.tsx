import { Icon } from 'design-system-react';

import { Link } from 'components/Link';

interface ExternalLinkProperties {
  href: string;
  label: string;
}
export function ExternalLink({
  href,
  label,
}: ExternalLinkProperties): JSX.Element {
  return (
    <Link href={href}>
      {label} <Icon ariaLabel='external link' name='external-link' />
    </Link>
  );
}

export default ExternalLink;
