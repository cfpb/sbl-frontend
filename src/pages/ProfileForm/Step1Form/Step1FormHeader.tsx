import { Link, TextIntroduction } from 'design-system-react';
import { gleifLink } from 'utils/common';


/**
 * 
 * @returns Header for Step1Form
 */
function Step1FormHeader(): JSX.Element {
  return (
          <div className="max-w-[41.875rem] mb-[2.8125rem]">
            <TextIntroduction
            heading="Complete your user profile"
            subheading='Indicate the financial institution you are authorized to file for to complete your user profile. Once you have successfully associated your user profile with a financial institution you will have access to the filing platform and can begin the filing process.'
            description={
              <>
                In order to begin using the filing platform you must have a Legal Entity identifier (LEI) for your financial institution. Visit the <Link href={gleifLink}>Global LEI Foundation (GLEIF)</Link> website for more information on how to obtain an LEI.
              </>
            }
          />
        </div>
  )
}

export default Step1FormHeader;