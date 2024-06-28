import FormHeaderWrapper from 'components/FormHeaderWrapper';
import { Link } from 'components/Link';
import { Paragraph, TextIntroduction } from 'design-system-react';
import { gleifGetAnLEI } from 'utils/common';

interface Step1FormHeaderProperties {
  isStep1: boolean;
}

const withAssociationsSubheading =
  'Select the financial institution for which you are authorized to file to complete your user profile. Once your user profile has been associated with a financial institution in our database you will have access to the platform and can begin the filing process.';
const noAssociationsSubheading =
  'Indicate the financial institution for which you are authorized to file to complete your user profile. Once we have associated your user profile with a financial institution in our database you will have access to the platform and can begin the filing process.';

function Step1FormHeader({ isStep1 }: Step1FormHeaderProperties): JSX.Element {
  return (
    <FormHeaderWrapper>
      <TextIntroduction
        heading='Complete your user profile'
        subheading={
          isStep1 ? withAssociationsSubheading : noAssociationsSubheading
        }
        description={
          <Paragraph>
            <>
              In order to begin using the platform you must have a Legal Entity
              Identifier (LEI) for your financial institution. If your
              organization does not have an LEI, visit the{' '}
              <Link href={gleifGetAnLEI}>Global LEI Foundation (GLEIF)</Link> to
              get an LEI. If you need assistance with this form,{' '}
              <Link href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Complete your user profile: Form assistance'>
                email our support staff
              </Link>
              .
            </>
          </Paragraph>
        }
      />
    </FormHeaderWrapper>
  );
}

export default Step1FormHeader;
