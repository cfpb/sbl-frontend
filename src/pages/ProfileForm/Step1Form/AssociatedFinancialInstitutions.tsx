import {
  Checkbox
} from 'design-system-react';
import type { FiDataChecked } from 'pages/ProfileForm/types';

interface AssociatedFinancialInstitutionProperties {
  key: string;
  fiObject: FiDataChecked;
  onCheckHandler: () => void;
}

function AssociatedFinancialInstitution({ onCheckHandler, fiObject, ...rest}: AssociatedFinancialInstitutionProperties & JSX.IntrinsicElements['input']): JSX.Element {
  return (
            <div className="flex flex-row gap-1 mt-[0.9375em]" key={fiObject.lei}>
              <Checkbox   
                id={`${fiObject.name} ${fiObject.lei}`}
                // TODO: In 'design-system-react' set label's type to be ReactNode
                label={                  
                  <div className='-translate-x-[0.2em] -translate-y-[1.4%]'>
                    <h4 className='mb-[0.025rem]'>{fiObject.name}</h4>
                    <p className='mb-[0.025rem]'>LEI: {fiObject.lei}</p>
                    <p className='mb-[0.025rem]'>Tax ID: {fiObject.taxID}</p>
                    <p className='mb-[0.025rem]'>Agency Code: {fiObject.agencyCode}</p>
                  </div>
                }
                checked={fiObject.checked}
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
  checkedListState: FiDataChecked[];
  setCheckedListState: ( callbackFunction: (previous: FiDataChecked[]) =>  FiDataChecked[]) => void
}

function AssociatedFinancialInstitutions({ checkedListState, setCheckedListState }: AssociatedFinancialInstitutionsProperties): JSX.Element {

  
  return (
          <div className="mb-[30px] mt-[30px]">
            {checkedListState.map((fiObject: FiDataChecked) => {
              const onCheckHandler = (): void => {
                setCheckedListState( (previous: FiDataChecked[]): FiDataChecked[]  => previous.map(object => {
                    if (object.lei !== fiObject.lei) return object;
                    return {...fiObject, 
                      checked: !fiObject.checked
                    };
                  }))
              };
              return (
              <AssociatedFinancialInstitution key={fiObject.lei} fiObject={fiObject} onCheckHandler={onCheckHandler}/>
            )
            })}
            
          </div>
  )
}


export default AssociatedFinancialInstitutions;