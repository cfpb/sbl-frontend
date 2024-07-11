import { Link } from 'components/Link';
import { Heading, Pagination, Table } from 'design-system-react';
import { useState } from 'react';
import Markdown from 'react-markdown';
import type { Detail, Field, FilingPeriodType } from 'types/filingTypes';
import { ITEMS_PER_PAGE, One } from 'utils/constants';
import useIsOverflowing from 'utils/useIsOverflowing';
import FilingErrorsWarningsLimit from './FilingErrors/FilingErrorsWarningsLimit';

// NOTE: To be removed after table styling finalized
// const maxUidTestRows = [...Array.from({ length: Hundred }).keys()].map(
//   (item, index) => [
//     index + 10_000,
//     '4234000O91BZ2SUPERCALIFRAGILISTICEXPIALI45CHARS',
//     '4234000O91BZ2SUPERCALIFRAGILISTICEXPIALI45CHARS',
//   ],
// );

// const wordBreakTestRows = [
//   [
//     'Row 1, Column 1',
//     'Row 1, Column 123456789TESTBANK123C2  123456789TESTBANK123C2  123456789TESTBANK123C2 123456789TESTBANK123C2 123456789TESTBANK123C2 123456789TESTBANK123C2',
//     'Row 1, Column 3 123456789TESTBANK123C2123456789TESTBANK123C2123456789TESTBANK123C2123456789TESTBANK123C2',
//   ],
//   ['Row 2, Column 1', 'Row 2, Column 2', 'Row 2, Column 3'],
//   ['Row 3, Column 1', 'Row 3, Column 2', 'Row 3, Column 3'],
// ];

interface FieldEntryProperties {
  fieldObject: Detail;
  lei: string;
  submissionId: number;
  filingPeriod: FilingPeriodType;
  isWarning?: boolean;
}

function FieldEntry({
  fieldObject,
  lei,
  submissionId,
  filingPeriod,
  isWarning,
}: FieldEntryProperties): JSX.Element {
  const validationId = fieldObject.validation.id;
  const validationLink = fieldObject.validation.fig_link;
  const validationName = fieldObject.validation.name;
  const validationDescription = fieldObject.validation.description;
  const validationIsTruncated = fieldObject.validation.is_truncated;
  // eslint-disable-next-line unicorn/no-array-reduce
  const additionalColumnHeaders = fieldObject.records[0].fields.reduce(
    (accumulator: Field['name'][], fieldsObject) => [
      ...accumulator,
      fieldsObject.name,
    ],
    [],
  );

  const columns = [
    { header: 'Row', cellDisableWordWrap: true, headerWordWrap: false },
    { header: 'Unique identifier (uid)', cellWordBreak: true },
    ...additionalColumnHeaders.map(headerName => ({
      header: headerName,
      cellWordBreak: true,
    })),
  ];
  const rows = fieldObject.records.map(object => {
    // eslint-disable-next-line unicorn/no-array-reduce
    const fieldValues = object.fields.reduce(
      (accumulator: Field['name'][], fieldsObject) => [
        ...accumulator,
        fieldsObject.value,
      ],
      [],
    );
    return [
      (object.record_no + One).toLocaleString(),
      object.uid,
      ...fieldValues,
    ];
  });

  const totalItems = rows.length;

  // Pagination Items
  const [currentPage, setCurrentPage] = useState<number>(One);

  const showPagination = totalItems > ITEMS_PER_PAGE;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - One) * ITEMS_PER_PAGE;
  const endIndex = currentPage * ITEMS_PER_PAGE;
  const itemsToShow = rows.slice(startIndex, endIndex);
  const previousItemsToShow = rows
    .slice(startIndex - ITEMS_PER_PAGE, startIndex - itemsToShow.length)
    .map(array => array.map((charNumber, index) => (index === 0 ? index : '')));
  const isHiddenTableAdded =
    showPagination && ITEMS_PER_PAGE > itemsToShow.length;

  const onIncrementPageNumber = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage(previousPageNumber => previousPageNumber + One);
    }
  };
  const onDecrementPageNumber = (): void => {
    if (currentPage > One) {
      setCurrentPage(previousPageNumber => previousPageNumber - One);
    }
  };
  const onClickGo = (inputNumber: number): void => {
    setCurrentPage(inputNumber);
  };

  // Selectively enable full table borders based on if the table's wrapper div is overflowing
  const [tableDivReference, tableDivReferenceIsOverflowing] =
    useIsOverflowing();

  // Show full table
  const showFullTableBorders =
    tableDivReferenceIsOverflowing ||
    (showPagination && currentPage === totalPages);

  return (
    <div className='mb-[2.8125rem]'>
      <div className='validation-info-section mb-[1.875rem] max-w-[41.875rem]'>
        <Link href={validationLink}>
          <Heading
            className='inline-block border-x-0 border-b-[1px] border-t-0 border-dotted hover:border-solid focus:border-solid focus:outline-dotted focus:outline-1'
            type='3'
          >
            {validationId}
          </Heading>
        </Link>
        <Heading type='4'>{validationName}</Heading>
        <Markdown>{validationDescription}</Markdown>
        {validationIsTruncated ? (
          <FilingErrorsWarningsLimit
            {...{ isWarning, lei, submissionId, filingPeriod }}
          />
        ) : null}
      </div>
      <div className='mb-[0.9375rem]'>
        <Table
          id={`${validationId}-validation-results`}
          className={`w-full max-w-full table-auto ${
            showFullTableBorders ? '' : '!border-0'
          }`}
          columns={columns}
          // @ts-expect-error TypeScript error needs to be resolved within DSR
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          rows={itemsToShow}
          isScrollableHorizontal
          // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
          ref={tableDivReference}
        />
        {/* NOTE: Table used to create space */}
        {isHiddenTableAdded ? (
          <Table
            id={`${validationId}-spacer`}
            className='w-full max-w-full table-auto !border-t-0 outline-none [&>tbody>tr:not(:last-child)]:border-b-transparent [&_thead]:hidden [&_tr]:invisible'
            aria-hidden='true'
            columns={columns}
            // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
            rows={previousItemsToShow}
            isScrollableHorizontal
          />
        ) : null}
      </div>
      {showPagination ? (
        <Pagination
          tableId={validationId}
          onClickGo={onClickGo}
          onClickNext={onIncrementPageNumber}
          onClickPrevious={onDecrementPageNumber}
          page={currentPage}
          pageCount={totalPages}
        />
      ) : null}
    </div>
  );
}

FieldEntry.defaultProps = {
  isWarning: false,
};

export default FieldEntry;
