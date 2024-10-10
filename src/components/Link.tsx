// this component could potentially be lifted with others into the DSR in a later refactor
// see: https://github.com/cfpb/sbl-frontend/issues/200

import { Link as DesignSystemReactLink, LinkProperties as DesignSystemReactLinkProperties, ListLink as DesignSystemReactListLink, Icon } from 'design-system-react';

const getIsLinkExternal = (url: string | undefined): boolean => {
  if (url === undefined) {
    return false;
  }
  const externalUriSchemes = ['http', 'mailto:', 'tel:', 'sms:', 'ftp:'];
  let isExternal = false;
  for (const uriScheme of externalUriSchemes) {
    if (url.startsWith(uriScheme)) {
      isExternal = true;
    }
  }
  return isExternal;
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
  target?: string | undefined;

  /* eslint-enable react/require-default-props */
}

export function Link({
  children,
  href,
  isRouterLink,
  ...others
}: LinkProperties): JSX.Element {
  const isInternalLink = getIsRouterLink(href, isRouterLink);
  const otherProperties: LinkProperties = { ...others };

  let icon = null
  if (!isInternalLink) {
    otherProperties.target = '_blank'; // Open link in new tab
   icon =<>
    {' '}<Icon name="external-link" className='link-icon-override-color' />
  </>
  }

  return (
    <DesignSystemReactLink
      href={href}
      isRouterLink={isInternalLink}
      hasIcon={!isInternalLink}
      {...otherProperties}
    >
      {children}
      {icon}
    </DesignSystemReactLink>
  );
}

export function ListLink({
  href,
  isRouterLink,
  children,
  ...others
}: LinkProperties): JSX.Element {
  const isInternalLink = getIsRouterLink(href, isRouterLink);
  const otherProperties: LinkProperties = { ...others };

  if (!isInternalLink) otherProperties.target = '_blank'; // Open link in new tab

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
