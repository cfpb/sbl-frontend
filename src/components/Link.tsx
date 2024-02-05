// this component could potentially be lifted with others into the DSR in a later refactor
// see: https://github.com/cfpb/sbl-frontend/issues/200

import type { LinkProperties as DesignSystemReactLinkProperties } from 'design-system-react';
import {
  Link as DesignSystemReactLink,
  ListLink as DesignSystemReactListLink,
} from 'design-system-react';

const getIsLinkExternal = (url: string | undefined): boolean => {
  if (url === undefined) {
    return false;
  }
  return url.startsWith('http');
};

const getIsRouterUsageInferred = (
  href: string | undefined,
  isRouterLink: boolean | undefined,
): boolean => isRouterLink === undefined && !getIsLinkExternal(href);

const getIsRouterLink = (
  href: string | undefined,
  isRouterLink: boolean | undefined,
): boolean => {
  const isRouterUsageInferred = getIsRouterUsageInferred(href, isRouterLink);
  if (isRouterUsageInferred) {
    return true;
  }
  if (isRouterLink === undefined) {
    return false;
  }
  return isRouterLink;
};

interface LinkProperties extends DesignSystemReactLinkProperties {
  // design system react's Link component correctly allows undefined values without defaultProps
  /* eslint-disable react/require-default-props */
  href?: string | undefined;
  isRouterLink?: boolean | undefined;
  /* eslint-enable react/require-default-props */
}

export function Link({
  children,
  href,
  isRouterLink,
  ...others
}: LinkProperties): JSX.Element {
  return (
    <DesignSystemReactLink
      href={href}
      isRouterLink={getIsRouterLink(href, isRouterLink)}
      {...others}
    >
      {children}
    </DesignSystemReactLink>
  );
}

export function ListLink({
  href,
  isRouterLink,
  children,
  ...others
}: LinkProperties): JSX.Element {
  return (
    <DesignSystemReactListLink
      href={href}
      isRouterLink={getIsRouterLink(href, isRouterLink)}
      {...others}
    >
      {children}
    </DesignSystemReactListLink>
  );
}
