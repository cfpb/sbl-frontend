import Links from 'components/CommonLinks';
import { List, ListItem, TextIntroduction } from 'design-system-react';

export function PageIntro(): JSX.Element {
  return (
    <TextIntroduction
      heading='View your financial institution profile'
      subheading='The following reflects the most up-to-date information available to the CFPB for your financial institution. We pull data from sources including GLEIF (Global Legal Entity Identifier Foundation), the National Information Center (NIC), and filers through direct requests.'
      description={
        <>
          Most changes to financial institution profile details must be handled
          at the source (GLEIF and NIC). For all other changes please submit the
          following form to our support staff.
        </>
      }
      callToAction={
        <List isLinks>
          <ListItem className='m-list_link'>
            <Links.UpdateInstitutionProfile isCallToAction />
          </ListItem>
        </List>
      }
    />
  );
}

export default PageIntro;
