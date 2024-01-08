import { List, ListLink } from 'design-system-react';
import { SubsectionWrapper } from './SubsectionWrapper';

export function FileSbl(): JSX.Element {
  return (
    <SubsectionWrapper>
      <h2 className='heading'>File your small business lending data</h2>
      <p>
        Covered financial institutions and voluntary reporters are required to
        maintain, report, and publicly disclose information about small business
        lending. This data is intended to help show whether lenders are serving
        the credit needs of small businesses in their communities, by increasing
        transparency in the lending marketplace.
      </p>
      <List isLinks className='mt-[15px]'>
        <ListLink href={`/filing?${Date.now().toString()}`}>
          File your small business lending data
        </ListLink>
      </List>
    </SubsectionWrapper>
  );
}

export default FileSbl;
