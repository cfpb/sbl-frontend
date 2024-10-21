// this component could potentially be lifted with others into the DSR in a later refactor
// see: https://github.com/cfpb/sbl-frontend/issues/200

import type { LinkProperties as DesignSystemReactLinkProperties } from 'design-system-react';
import {
  Link as DesignSystemReactLink,
  LinkText,
  ListItem,
} from 'design-system-react';
import { IconExternalLink, isExternalLink } from './Link.utils';

interface LinkProperties extends DesignSystemReactLinkProperties {
  // design system react's Link component correctly allows undefined values without defaultProps
  /* eslint-disable react/require-default-props */
  href?: string | undefined;
  isRouterLink?: boolean | undefined;
  isExternalLink?: boolean | undefined;
  target?: string | undefined;

  /* eslint-enable react/require-default-props */
}

export function Link({
  children,
  href,
  isRouterLink,
  className,
  ...others
}: LinkProperties): JSX.Element {
  const isExternal = others.isExternalLink ?? isExternalLink(String(href));
  const otherProperties: LinkProperties = { ...others };
  let icon;

  if (isExternal) {
    otherProperties.target = '_blank'; // Open link in new tab
    otherProperties.hasIcon = true; // Underline text, not icon
    icon = <IconExternalLink />; // Display icon
  }

  return (
    <DesignSystemReactLink
      href={href}
      isRouterLink={isRouterLink ?? !isExternal}
      className={className}
      {...otherProperties}
    >
      <LinkText>{children}</LinkText>
      {icon}
    </DesignSystemReactLink>
  );
}

export function ListLink({ children, ...others }: LinkProperties): JSX.Element {
  return (
    <ListItem>
      <Link {...others} type='list'>
        {children}
      </Link>
    </ListItem>
  );
}
