import { Link } from 'components/Link';
import { Heading, Pagination, Table } from 'design-system-react';
import Markdown from 'react-markdown';
import type { Detail, Field } from 'types/filingTypes';

interface FieldEntryProperties {
  fieldObject: Detail;
}

function FieldEntry({ fieldObject }: FieldEntryProperties): JSX.Element {
  const validationId = fieldObject.validation.id;
  const validationLink = fieldObject.validation.fig_link;
  const validationName = fieldObject.validation.name;
  const validationDescription = fieldObject.validation.description;
  // eslint-disable-next-line unicorn/no-array-reduce
  const additionalColumnHeaders = fieldObject.records[0].fields.reduce(
    (accumulator: Field['name'][], fieldsObject) => [
      ...accumulator,
      fieldsObject.name,
    ],
    [],
  );
  const rows = fieldObject.records.map(object => {
    // eslint-disable-next-line unicorn/no-array-reduce
    const fieldValues = object.fields.reduce(
      (accumulator: Field['name'][], fieldsObject) => [
        ...accumulator,
        fieldsObject.value,
      ],
      [],
    );
    return [object.record_no, object.uid, ...fieldValues];
  });

  return (
    <div className='mb-[2.8125rem]'>
      <div className='validation-info-section mb-[1.875rem] max-w-[41.875rem]'>
        <Link target='_blank' href={validationLink}>
          <Heading type='3'>{validationId}</Heading>
        </Link>
        <Heading type='4'>{validationName}</Heading>
        <Markdown>{validationDescription}</Markdown>
      </div>
      <Table
        className='w-full max-w-full table-auto'
        columns={['Row', 'Unique identifier (uid)', ...additionalColumnHeaders]}
        // rows={[...Array.from({ length: 100 }).keys()].map((item, index) => [
        //   index + 10_000,
        //   '4234000O91BZ2SUPERCALIFRAGILISTICEXPIALI45CHARS',
        //   '4234000O91BZ2SUPERCALIFRAGILISTICEXPIALI45CHARS',
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
        // @ts-expect-error TypeScript error needs to be resolved within DSR
        rows={rows}
        isScrollableHorizontal
      />
      <Pagination
        onClickGo={function za() {}}
        onClickNext={function za() {}}
        onClickPrevious={function za() {}}
        page={20}
        pageCount={40}
      />
    </div>
  );
}

export default FieldEntry;
