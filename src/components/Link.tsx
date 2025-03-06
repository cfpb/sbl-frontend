// this component could potentially be lifted with others into the DSR in a later refactor
// see: https://github.com/cfpb/sbl-frontend/issues/200

import type { LinkProperties as DesignSystemReactLinkProperties } from 'design-system-react';
import {
  Link as DesignSystemReactLink,
  LinkText,
  ListItem,
} from 'design-system-react';
import {
  IconExternalLink,
  isExternalLinkImplied,
  useIsNewTabImplied,
} from './Link.utils';

interface LinkProperties extends DesignSystemReactLinkProperties {
  // design system react's Link component correctly allows undefined values without defaultProps
  /* eslint-disable react/require-default-props */
  href?: string | undefined;
  isRouterLink?: boolean | undefined;
  isExternalLink?: boolean | undefined;
  isNewTab?: boolean | undefined;
  target?: string | undefined;

  /* eslint-enable react/require-default-props */
}

export function Link({
  children,
  href,
  isRouterLink,
  isNewTab,
  className,
  isExternalLink,
  ...others
}: LinkProperties): JSX.Element {
  const otherProperties: LinkProperties = { ...others };
  let icon;

  // Open link in new tab
  const isNewTabImplied = useIsNewTabImplied(href);
  const openInNewTab = isNewTab ?? isNewTabImplied;
  if (openInNewTab) otherProperties.target = '_blank';

  // Treat as an External link
  const treatExternal = isExternalLink ?? isExternalLinkImplied(String(href));
  if (treatExternal) {
    otherProperties.hasIcon = true; // Underline text, not icon
    icon = <IconExternalLink />; // Display icon
  }

  const asInAppLink = isRouterLink ?? (!treatExternal && !openInNewTab);

  return (
    <DesignSystemReactLink
      href={href}
      isRouterLink={asInAppLink}
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
