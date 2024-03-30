import { List, ListLink, TextIntroduction } from 'design-system-react';
import { useParams } from 'react-router-dom';

export function PageIntro(): JSX.Element {
  const { lei } = useParams();

  return (
    <TextIntroduction
      heading='View your financial institution profile'
      subheading='This profile reflects the most current data available to the CFPB for your financial institution. We pull data from sources including GLEIF (Global Legal Entity Identifier Foundation), the National Information Center (NIC), and filers through direct requests.'
      description={
        <>
          Most changes to financial institution profile details must be handled
          at the source (GLEIF and NIC). For all other changes submit the
          following form to our support staff.
        </>
      }
      callToAction={
        <List isLinks>
          <ListLink isRouterLink href={`/institution/${lei}/update`}>
            Update your financial institution profile
          </ListLink>
        </List>
      }
    />
  );
}

export default PageIntro;
