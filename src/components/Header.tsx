import {
  GovBanner,
  NavMenuButton,
  Title,
  Header as USWDSHeader
} from '@trussworks/react-uswds';
import type { ReactElement } from 'react';
import { useState } from 'react';

import useToggle from 'store/useToggle';

export default function Header(): ReactElement {
  const allUseToggle = useToggle();

  console.log('Header - useToggle info', allUseToggle);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [navDropdownOpen, setNavDropdownOpen] = useState([false, false]);

  const handleToggleNavDropdown = (index: number): void => {
    setNavDropdownOpen(previousNavDropdownOpen => {
      const newOpenState = Array.from({
        length: previousNavDropdownOpen.length
      }).fill(false);

      newOpenState[index] = !previousNavDropdownOpen[index];
      return newOpenState;
    });
  };

  const toggleMobileNav = (): void => {
    setMobileNavOpen(previousOpen => !previousOpen);
  };

  return (
    <>
      <a className='usa-skipnav' href='#main-content'>
        Skip to main content
      </a>
      <GovBanner />
      <div className={`usa-overlay ${mobileNavOpen ? 'is-visible' : ''}`} />
      <USWDSHeader basic>
        <div className='usa-nav-container'>
          <div className='usa-navbar'>
            <Title id='basic-logo'>
              <a href='/' title='Home' aria-label='Home'>
                Small Business Lending
              </a>
            </Title>
            <NavMenuButton
              label='Menu'
              onClick={toggleMobileNav}
              className='usa-menu-btn'
            />
            <button onClick={() => allUseToggle.toggle()}>Click Me</button>
          </div>
        </div>
      </USWDSHeader>
    </>
  );
}
