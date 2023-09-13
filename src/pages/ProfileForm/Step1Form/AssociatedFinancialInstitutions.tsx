import {
  Checkbox
} from 'design-system-react';
import type { CheckedState, FiDataType } from 'pages/ProfileForm/types';
import { useEffect, useState } from 'react';

interface AssociatedFinancialInstitutionProperties {
  fiObject: FiDataType;
  defaultChecked?: boolean;
  onCheckHandler: () => void;
}

function AssociatedFinancialInstitution({ fiObject, onCheckHandler, ...rest}: AssociatedFinancialInstitutionProperties): JSX.Element {
  return (
            <div className="flex flex-row gap-1 mt-[0.9375em]" key={fiObject.lei}>
              <Checkbox   
                id={`${fiObject.name} ${fiObject.lei}`}
                // TODO: In 'design-system-react' set label's type to be ReactNode
                label={                  
                  <div className='-translate-x-[0.2em] -translate-y-[2%]'>
                    <h4 className='mb-[0.025rem]'>{fiObject.name}</h4>
                    <p className='mb-[0.025rem]'>LEI: {fiObject.lei}</p>
                    <p className='mb-[0.025rem]'>Tax ID: {fiObject.taxID}</p>
                    <p className='mb-[0.025rem]'>Agency Code: {fiObject.agencyCode}</p>
                  </div>
                }
                name={fiObject.lei} 
                onChange={onCheckHandler}
                {...rest}
                />
            </div>
  )
}

AssociatedFinancialInstitution.defaultProps ={
  defaultChecked: false
};

interface AssociatedFinancialInstitutionsProperties {
  fiData: FiDataType[];
  handleCheckedState: (checkedState: CheckedState) => void
}

const emptyArray: FiDataType[] = [];

function AssociatedFinancialInstitutions({ fiData = emptyArray, handleCheckedState }: AssociatedFinancialInstitutionsProperties): JSX.Element {
  const formatCheckedState = (fiDataInput: FiDataType[]): CheckedState => Object.fromEntries(fiDataInput.map((object) => [object.lei, false]));
  const [checkedListState, setCheckedListState] = useState<CheckedState>(formatCheckedState(fiData));
  
  // Passes the checkboc state to the parent's callback
  useEffect(() =>{
    handleCheckedState(checkedListState)
  },[handleCheckedState, checkedListState]);
  
  return (
          <div className="mb-[30px] mt-[30px]">
            {fiData.map((fiObject: FiDataType) => {
              const onCheckHandler = (): void => {
                setCheckedListState(previousState => ({
                  ...previousState,
                  [fiObject.lei]: !previousState[fiObject.lei]
                }))
                
                
              };
              return (
              <AssociatedFinancialInstitution key={fiObject.lei} fiObject={fiObject} defaultChecked={false} onCheckHandler={onCheckHandler}/>
            )
            })}
            
          </div>
  )
}


export default AssociatedFinancialInstitutions;