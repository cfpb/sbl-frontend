import { ListLink } from 'components/Link';
import { Heading, List, Paragraph } from 'design-system-react';
import { SubsectionWrapper } from './SubsectionWrapper';

export function FileSbl(): JSX.Element {
  return (
    <SubsectionWrapper>
      <Heading type='2'>File your small business lending data</Heading>
      <Paragraph>
        The small business lending rule requires covered financial institutions
        to maintain and report information about small business lending to the
        CFPB. This data is intended to increase transparency in the small
        business lending market, promote economic development, and help combat
        unlawful discrimination.
      </Paragraph>
      <List isLinks className='mt-[15px]'>
        <ListLink href='/filing' className='a-btn'>
          File your data
        </ListLink>
      </List>
    </SubsectionWrapper>
  );
}

export default FileSbl;
