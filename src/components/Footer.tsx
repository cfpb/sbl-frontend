/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Address,
  FooterNav,
  Grid,
  GridContainer,
  Logo,
  SocialLink,
  SocialLinks,
  Footer as USWDSFooter
} from '@trussworks/react-uswds';
import type { ReactElement } from 'react';
import useToggle from 'store/useToggle';

const socialLinkItems = [
  <SocialLink key='facebook' name='Facebook' href='#' />,
  <SocialLink key='twitter' name='Twitter' href='#' />,
  <SocialLink key='youtube' name='YouTube' href='#' />,
  <SocialLink key='instagram' name='Instagram' href='#' />,
  <SocialLink key='rss' name='RSS' href='#' />
];

const footerPrimary = (
  <FooterNav
    aria-label='Footer navigation'
    size='medium'
    links={
      Array.from({ length: 5 }).fill(
        <a href='#' className='usa-footer__primary-link'>
          Cool link
        </a>
      ) as ReactElement[]
    }
  />
);

const returnToTop = (
  <GridContainer className='usa-footer__return-to-top'>
    <a href='#'>Return to top</a>
  </GridContainer>
);

const footerSecondary = (
  <Grid row gap>
    <Logo
      size='medium'
      image={<img className='usa-footer__logo-img' src='#' alt='' />}
      heading={
        <p className='usa-footer__logo-heading'>
          Consumer Financial Protection Bureau
        </p>
      }
    />
    <Grid className='usa-footer__contact-links' mobileLg={{ col: 6 }}>
      <SocialLinks links={socialLinkItems} />
      <Address
        size='medium'
        items={[
          <a key='telephone' href='tel:1-800-555-5555'>
            (800) CALL-GOVT
          </a>,
          <a key='email' href='mailto:sblhelp@consumerfinance.gov'>
            sblhelp@consumerfinance.gov
          </a>
        ]}
      />
    </Grid>
  </Grid>
);

export default function Footer(): ReactElement {
  const allUseToggle = useToggle();
  console.log('Footer - useToggle info', allUseToggle);

  return (
    <>
      <div
        style={{
          color: allUseToggle.data.clicked ? 'blue' : 'black'
        }}
      >
        Test
      </div>
      <USWDSFooter
        returnToTop={returnToTop}
        primary={footerPrimary}
        secondary={footerSecondary}
      />
    </>
  );
}
