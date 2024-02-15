import { Hero, Paragraph } from 'design-system-react';
import type { ReactElement } from 'react';
import { LinkContactSupport, LinkVisitHomepage } from './_shared';
import './error.less';

export function NotFound404(): ReactElement {
  return (
    <Hero
      className='error-page'
      backgroundColor='white'
      image='/plug-538x655.png'
      heading="404: We can't find that page"
      subheading={
        <>
          <Paragraph>
            Visit the platform homepage for additional resources or contact our
            support staff.
          </Paragraph>
          <LinkVisitHomepage />
          <br />
          <br />
          <Paragraph className='contact-us'>
            Are you sure this is the right web address?&nbsp;
            <LinkContactSupport />
          </Paragraph>
        </>
      }
    />
  );
}

export default NotFound404;
