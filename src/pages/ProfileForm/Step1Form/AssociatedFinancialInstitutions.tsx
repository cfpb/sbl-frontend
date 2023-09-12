import {
  Checkbox
} from 'design-system-react';
import type { FiDataType } from 'pages/ProfileForm/types';

interface AssociatedFinancialInstitutionProperties {
  fiObject: FiDataType;
}

function AssociatedFinancialInstitution({ fiObject }: AssociatedFinancialInstitutionProperties): JSX.Element {
  return (
              <div className="flex flex-row gap-1 mt-[0.9375em]" key={fiObject.lei}>
              <Checkbox   
                id={fiObject.lei}
                label=""
                name={fiObject.lei} 
                />
                <label htmlFor={fiObject.lei}>
                  <div className='-translate-x-[0.2em] -translate-y-[2%]'>
                    <h4 className='mb-[0.025rem]'>{fiObject.bankName}</h4>
                    <p className='mb-[0.025rem]'>LEI: {fiObject.lei}</p>
                    <p className='mb-[0.025rem]'>Tax ID: {fiObject.taxID}</p>
                    <p className='mb-[0.025rem]'>Agency Code: {fiObject.agencyCode}</p>
                  </div>
                </label>
            </div>
  )
}

interface AssociatedFinancialInstitutionsProperties {
  fiData: FiDataType[];
}

function AssociatedFinancialInstitutions({ fiData }: AssociatedFinancialInstitutionsProperties): JSX.Element {
  return (
          <div className="mb-[30px] mt-[30px]">
            {fiData.map((fiObject: FiDataType) => (
              <AssociatedFinancialInstitution key={fiObject.lei} fiObject={fiObject}/>
            ))}
            
          </div>
  )
}

export default AssociatedFinancialInstitutions;