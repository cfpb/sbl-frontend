import { Icon } from 'design-system-react';
import type { ReactElement } from 'react';

/**
 * Programmatically determine if a link is external to the CFPB sphere of websites
 */
export const isExternalLink = (targetUrl: string): boolean => {
  let parsed;

  try {
    parsed = new URL(targetUrl);
  } catch {
    return false; // Internal targets will fail parsing (ex. '/home')
  }

  const externalProtocols = ['http', 'tel:', 'sms:', 'ftp:'];
  if (externalProtocols.includes(parsed.protocol)) return true;

  // Any subdomain of consumerfinance.gov or the current host
  const isInternal = new RegExp(
    `([\\S]*\\.)?(((consumerfinance|cf)\\.gov)|(${window.location.host}))`,
  );
  if (!isInternal.test(parsed.host)) return true;

  return false;
};

// External link icon w/ spacing
export function IconExternalLink(): ReactElement {
  return (
    <>
      {' '}
      <Icon name='external-link' className='link-icon-override-color' />
    </>
  );
}
