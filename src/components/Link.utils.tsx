import useSblAuth from 'api/useSblAuth';
import { Icon } from 'design-system-react';
import type { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

// Parse URL string into URL object
const parseURL = (url: string): URL | false => {
  let parsed;

  try {
    parsed = new URL(url);
  } catch {
    return false; // Relative targets will fail parsing (ex. '/home')
  }

  return parsed;
};

/**
 * Programmatically determine if a link is external to the CFPB sphere of websites
 */
export const isExternalLinkImplied = (targetUrl: string): boolean => {
  const parsed = parseURL(targetUrl);
  if (!parsed) return false; // Invalid URL or Relative URL (ex. '/home')

  const externalProtocols = ['http', 'tel:', 'sms:', 'ftp:'];
  if (externalProtocols.includes(parsed.protocol)) return true;

  const internalProtocols = ['mailto:'];
  if (internalProtocols.includes(parsed.protocol)) return false;

  // [Internal] Any subdomain of consumerfinance.gov or the current host
  const internalHosts = [
    'www.consumerfinance.gov',
    'sblhelp.consumerfinance.gov',
    window.location.host,
  ];

  const isExternal = !internalHosts.includes(parsed.host);

  return isExternal;
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

// Determine if the the target href should open in a new tab.
// This logic has been centralized and codified to avoid
// bespoke logic per link.
//
// Reference: https://github.com/cfpb/sbl-project/issues/295

export function useIsNewTabImplied(href: string | undefined): boolean {
  const { ...auth } = useSblAuth();
  const { pathname } = useLocation();

  // No link to open
  if (!href) return false;

  // User is NOT logged-in to Login.gov / Keycloak
  if (!auth.isAuthenticated) return false;

  // User is on a "Complete user profile" page, which qualifies as "Not logged-in"
  // (Once associated with an LEI, users are always redirected away from these pages)
  if (pathname.includes('/profile/complete')) return false;

  // Login.gov account page opens in same tab
  if (href === 'https://secure.login.gov/account/') return false;

  // Open a new tab when the user is logged-in but visiting an unauthenticated page
  const isCollectionAndReportingRequirements = href.endsWith(
    '/compliance/compliance-resources/',
  );
  const isFinalRule = href.endsWith('/rules-policy/final-rules/');
  const isPaperworkReductionAct = href.endsWith(
    '/paperwork-reduction-act-notice',
  );
  const isUnauthenticatedHomepage = href.toString() === '/';
  const isViewPrivacyNotice = href.endsWith('/privacy-notice');

  if (
    isViewPrivacyNotice ||
    isPaperworkReductionAct ||
    isFinalRule ||
    isCollectionAndReportingRequirements ||
    isUnauthenticatedHomepage
  )
    return true;

  // Open in the same tab if the target is within our app
  const parsed = parseURL(href);
  if (!parsed) return false;

  const isTargetWithinOurAppDomain = new RegExp(
    `([\\S]*\\.)?(${window.location.host})`,
  ).test(parsed.host);

  if (isTargetWithinOurAppDomain) return false;

  // All other links will open in a new tab
  return true;
}
