import { Link } from 'components/Link';
import { Heading, Paragraph } from 'design-system-react';
import type { ReactElement } from 'react';
import './error.less';

export function NotFound404(): ReactElement {
  return (
    <main className='content error_main error_main__404' id='main'>
      <div className='content_wrapper'>
        <div className='content_main '>
          <section className='content_main-inner'>
            <div className='error_copy_container'>
              <header className='error_header'>
                <Heading>
                  404: We can’t find the page you’re looking for
                </Heading>
                <Paragraph isLead>
                  Visit the platform homepage for additional resources or
                  contact our support staff.
                </Paragraph>
              </header>
            </div>

            <aside className='error_action_container'>
              <Link href='/' className='a-btn a-btn__full-on-xs'>
                Visit platform homepage
              </Link>

              <Paragraph className='contact-us'>
                Are you sure this is the right web address?&nbsp;
                <Link
                  className='a-link a-link__jump'
                  href='https://sblhelp.consumerfinance.gov/'
                >
                  <span className='a-link_text'>Contact our support staff</span>
                </Link>
              </Paragraph>
            </aside>
          </section>
        </div>
      </div>
    </main>
  );
}

export default NotFound404;
