import { Heading, Link, Paragraph } from 'design-system-react';
import type { ReactElement } from 'react';
import './error.less';

export function NotFound404(): ReactElement {
  return (
    <main className='content error_main error_main__404' id='main'>
      <div className='content_wrapper'>
        <div className='content_main '>
          <section className='content_main-inner'>
            <div className='error_copy_container'>
              <header className='error_header u-mt30'>
                <Heading>404: Page not found</Heading>
                <Paragraph isLead>
                  We can’t find the page you’re looking for. Visit our homepage
                  for helpful tools and resources, or contact us and we’ll point
                  you in the right direction.
                </Paragraph>
              </header>
            </div>

            <div className='error_action_container'>
              <div className='error_action_col'>
                <Link href='/' className='a-btn a-btn__full-on-xs'>
                  Platform homepage
                </Link>
              </div>
              <div className='error_action_col'>
                <Link
                  className='a-btn a-btn__full-on-xs'
                  href='/about-us/contact-us/'
                >
                  Contact us
                </Link>
              </div>
            </div>

            <Paragraph>
              Are you sure this is the right web address?&nbsp;
              <Link
                className='a-link a-link__jump'
                href={`mailto:CFPB_website@consumerfinance.gov?subject=404%20Error%20at%20%22${encodeURIComponent(
                  window.location.href,
                )}%22`}
              >
                <span className='a-link_text'>Let us know</span>
              </Link>
            </Paragraph>
          </section>
        </div>
      </div>
    </main>
  );
}

export default NotFound404;
