import { ListLink } from 'components/Link';
import { List, Paragraph, TextIntroduction } from 'design-system-react';
import { useParams } from 'react-router-dom';

export function PageIntro(): JSX.Element {
  const { lei } = useParams();

  return (
    <TextIntroduction
      heading='View your financial institution profile'
      subheading='This profile reflects the most current data available to the CFPB for your financial institution. We pull data from sources including Global Legal Entity Identifier Foundation (GLEIF), the National Information Center (NIC), and direct requests to our support staff.'
      description={
        <Paragraph>
          Most updates to financial institution profile details must be handled
          at the source (GLEIF or NIC). For all other update requests, click on
          the following link.
        </Paragraph>
      }
      callToAction={
        <List isLinks>
          <ListLink href={`/institution/${lei}/update`}>
            Update your financial institution profile
          </ListLink>
        </List>
      }
    />
  );
}

export default PageIntro;
