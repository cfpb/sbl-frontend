import { Link } from 'design-system-react';

/**
 * 
 * @returns Header for Step1Form
 */
function Step1FormHeader(): JSX.Element {
  return (
          <div className="max-w-[670px]">
            {/* <h1>Complete your user profile</h1>
            <p className="lead-paragraph">In order to complete your user profile and access the filing platform your financial institution must have a Legal Entity Identifier (LEI). Visit the Global LEI Foundation (GLEIF) website for information on how to obtain an LEI for your institution.</p> */}
            <h1 className="text-[26px] md:text-[30px] font-semibold leading-tight mb-[0.44117647em]">Complete your user profile</h1>
            <p className="text-[18px] md:text-[20px] font-normal leading-tight mb-[30px]">In order to complete your user profile and access the filing platform your financial institution must have a Legal Entity Identifier (LEI). Visit the Global LEI Foundation (GLEIF) website for information on how to obtain an LEI for your institution.</p>
            <p className="leading-paragraph mb-[30px]">
              In order to begin using the filing platform you must have a Legal Entity identifier (LEI) for your financial institution. Visit the <Link href="#">Global LEI Foundation (GLEIF)</Link> website for more information on how to obtain an LEI.
            </p>
            <p />
        </div>
  )
}

export default Step1FormHeader;