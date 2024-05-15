import { ListLink } from 'components/Link';
import { List, TextIntroduction } from 'design-system-react';
import { useParams } from 'react-router-dom';

export function PageIntro(): JSX.Element {
  const { lei } = useParams();

  return (
    <TextIntroduction
      heading='View your financial institution profile'
      subheading='This profile reflects the most current data available to the CFPB for your financial institution. We pull data from sources including GLEIF (Global Legal Entity Identifier Foundation), the National Information Center (NIC), and direct requests to our support staff.'
      description={
        <>
          Most updates to financial institution profile details must be handled
          at the source (GLEIF or NIC). For all other update requests, click on
          the following link.
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
