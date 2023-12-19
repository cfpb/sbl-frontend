import { Icon } from 'design-system-react';

interface ExternalLinkProperties {
  href: string;
  label: string;
}
export function ExternalLink({
  href,
  label,
}: ExternalLinkProperties): JSX.Element {
  return (
    <a href={href}>
      {label} <Icon name='external-link' />
    </a>
  );
}

export default ExternalLink;
