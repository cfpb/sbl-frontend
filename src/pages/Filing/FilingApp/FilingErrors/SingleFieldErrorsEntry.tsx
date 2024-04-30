import { Link } from 'components/Link';
import { Heading } from 'design-system-react';

interface SingleFieldErrorsEntryProperties {
  singleErrorObject: unknown;
}

function SingleFieldErrorsEntry({
  singleErrorObject,
}: SingleFieldErrorsEntryProperties): JSX.Element {
  const validationId = singleErrorObject.validation.id;
  const validationLink = singleErrorObject.validation.fig_link;
  const validationName = singleErrorObject.validation.name;
  return (
    <>
      <Link href={validationLink}>{validationId}</Link>
      <Heading type='4'>{validationName}</Heading>
    </>
  );
}

export default SingleFieldErrorsEntry;
