import FormHeaderWrapper from 'components/FormHeaderWrapper';
import { Link } from 'components/Link';
import { TextIntroduction } from 'design-system-react';
import { gleifLink } from 'utils/common';

interface Step1FormHeaderProperties {
  crumbTrailMarginTop: boolean;
}

function Step1FormHeader({
  crumbTrailMarginTop,
}: Step1FormHeaderProperties): JSX.Element {
  return (
    <FormHeaderWrapper crumbTrailMarginTop={crumbTrailMarginTop}>
      <TextIntroduction
        heading='Complete your user profile'
        subheading='Complete the fields below and select the financial institution you are authorized to file for. Once you have successfully associated your user profile with a financial institution you will have access to the platform and can begin the filing process.'
        description={
          <>
            In order to begin using the filing platform you must have a Legal
            Entity Identifier (LEI) for your financial institution. Visit the{' '}
            <Link href={gleifLink}>Global LEI Foundation (GLEIF)</Link> website
            for more information on how to obtain an LEI.
          </>
        }
      />
    </FormHeaderWrapper>
  );
}

export default Step1FormHeader;
