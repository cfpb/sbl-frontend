import { Link } from 'components/Link';
import { Heading, List, ListItem, Table } from 'design-system-react';

interface SingleFieldErrorsEntryProperties {
  singleErrorObject: unknown;
}

function SingleFieldErrorsEntry({
  singleErrorObject,
}: SingleFieldErrorsEntryProperties): JSX.Element {
  const validationId = singleErrorObject.validation.id;
  const validationLink = singleErrorObject.validation.fig_link;
  const validationName = singleErrorObject.validation.name;
  const validationDescription = singleErrorObject.validation.description;
  const column3Header = singleErrorObject.records[0].fields[0].name;
  const rows = singleErrorObject.records.map(object => [
    object.record_no,
    object.uid,
    object.fields[0].value,
  ]);

  return (
    <div className='mb-[2.8125rem]'>
      <Link target='_blank' href={validationLink}>
        <Heading type='3'>{validationId}</Heading>
      </Link>
      <Heading type='4'>{validationName}</Heading>
      <List>
        <ListItem>{validationDescription}</ListItem>
      </List>
      <Table
        className='w-full max-w-full table-auto'
        // caption='Table caption describing the data'
        columns={['Row', 'Unique identifier (uid)', column3Header]}
        // rows={[...Array.from({ length: 100 }).keys()].map((item, index) => [
        //   index,
        //   '4234000O91BZ2SUPERCALIFRAGILISTICEXPIALI46CHARS',
        //   '4234000O91BZ2SUPERCALIFRAGILISTICEXPIALI46CHARS',
        // ])}
        // rows={[
        //   [
        //     'Row 1, Column 1',
        //     'Row 1, Column 123456789TESTBANK123C2  123456789TESTBANK123C2  123456789TESTBANK123C2 123456789TESTBANK123C2 123456789TESTBANK123C2 123456789TESTBANK123C2',
        //     'Row 1, Column 3 123456789TESTBANK123C2123456789TESTBANK123C2123456789TESTBANK123C2123456789TESTBANK123C2',
        //   ],
        //   ['Row 2, Column 1', 'Row 2, Column 2', 'Row 2, Column 3'],
        //   ['Row 3, Column 1', 'Row 3, Column 2', 'Row 3, Column 3'],
        // ]}
        rows={rows}
        isScrollableHorizontal
      />
    </div>
  );
}

export default SingleFieldErrorsEntry;
