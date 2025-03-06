import { Hero } from 'design-system-react';
import type { ReactElement } from 'react';
import { LinkContactSupport, LinkVisitHomepage } from './_shared';
import './error.less';

export function NotFound404(): ReactElement {
  return (
    <Hero
      className='error-page'
      image='/plug-538x655.png'
      heading="404: We can't find that page"
      subheading={
        <>
          <span className='mb-[1.25rem] inline-block'>
            Visit the platform homepage for additional resources or contact our
            support staff.
          </span>
          <LinkVisitHomepage />
          <br />
          <br />
          <span className='contact-us'>
            Are you sure this is the right web address?&nbsp;
            <LinkContactSupport />
          </span>
        </>
      }
    />
  );
}

export default NotFound404;
