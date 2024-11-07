import { Icon } from 'design-system-react';
import type { ReactElement } from 'react';

// Link to specific regulation
// Ex: /rules-policy/regulations/1002/109/#a-1-ii
const regsLinkPattern = /\/rules-policy\/regulations\/\d+\/\d+\/#.+/;

// Link to specific FIG subsection
// Ex: /small-business-lending/filing-instructions-guide/2024-guide/#4.4.1
const figLinkPattern = /\/filing-instructions-guide\/\d{4}-guide\/#.+/;

/**
 * Programmatically determine if a link is external to the CFPB sphere of websites
 */
export const isExternalLinkImplied = (targetUrl: string): boolean => {
  let parsed;

  try {
    parsed = new URL(targetUrl);
  } catch {
    return false; // Relative targets will fail parsing (ex. '/home')
  }

  const externalProtocols = ['http', 'tel:', 'sms:', 'ftp:'];
  if (externalProtocols.includes(parsed.protocol)) return true;

  const internalProtocols = ['mailto:'];
  if (internalProtocols.includes(parsed.protocol)) return false;

  // Any subdomain of consumerfinance.gov or the current host
  const isInternalDomain =
    parsed.host.endsWith('consumerfinance.gov') ||
    parsed.host === window.location.host;

  return !isInternalDomain;
};

// External link icon w/ spacing
export function IconExternalLink(): ReactElement {
  return (
    <>
      {' '}
      {/* @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717 */}
      <Icon name='external-link' className='link-icon-override-color' />
    </>
  );
}

export function isNewTabImplied(href: string | undefined): boolean {
  if (!href) return false;
  return regsLinkPattern.test(href) || figLinkPattern.test(href);
}
