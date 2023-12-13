import {
  Checkbox,
  Link
} from 'design-system-react';
import { Element } from 'react-scroll';
import FormParagraph from "components/FormParagraph";
import type { FiDataChecked } from 'pages/ProfileForm/types';

interface AssociatedFinancialInstitutionProperties {
  key: string;
  isFirst: boolean;
  fiObject: FiDataChecked;
  onCheckHandler: () => void;
  hasError: boolean;
}

function AssociatedFinancialInstitution({ onCheckHandler, fiObject, isFirst, hasError, ...rest}: AssociatedFinancialInstitutionProperties & JSX.IntrinsicElements['input']): JSX.Element {
  if (!isFirst) return null;
  return (
            <div className={`flex flex-row gap-1 ${isFirst ? "mt-[0.9375em]" : ""}`} key={fiObject.lei}>
              <Checkbox   
                id={`${fiObject.name} ${fiObject.lei}`}
                className={`${hasError ? "error-checkbox" : ""}`}
                label={                  
                  <div className='-translate-x-[0.2em] -translate-y-[1.4%]'>
                    <h4 className='mb-[0.03rem]'>{fiObject.name}</h4>
                    <p className='mb-[0.03rem] font-normal'>LEI: {fiObject.lei}</p>
                    <p className='mb-[0.03rem] font-normal'>Tax ID: {fiObject.taxID}</p>
                    <p className='mb-[0.03rem] font-normal'>Agency Code: {fiObject.agencyCode}</p>
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
  errors: object;
  checkedListState: FiDataChecked[];
  setCheckedListState: ( callbackFunction: (previous: FiDataChecked[]) =>  FiDataChecked[]) => void
}

function AssociatedFinancialInstitutions({ checkedListState, errors, setCheckedListState }: AssociatedFinancialInstitutionsProperties): JSX.Element {

  
  return (
          <Element name="financialInstitutions">
            <FormParagraph>
              The following financial institution is associated with your email domain. Check the box if you are authorized to file for this institution.
            </FormParagraph>
            
            <div>
              {checkedListState.map((fiObject: FiDataChecked, idx: number) => {
                const onCheckHandler = (): void => {
                  setCheckedListState( (previous: FiDataChecked[]): FiDataChecked[]  => previous.map(object => {
                      if (object.lei !== fiObject.lei) return object;
                      return {...fiObject, 
                        checked: !fiObject.checked
                      };
                    }))
                };
                return (
                <AssociatedFinancialInstitution hasError={Boolean(errors.financialInstitutions)}key={fiObject.lei} isFirst={idx === 0} fiObject={fiObject} onCheckHandler={onCheckHandler}/>
              )
              })}
            </div>
            <FormParagraph>If you are authorized to file for an institution that is not listed, please complete this form and then contact our support staff <Link href="#">contact our support staff</Link> to complete your user profile.</FormParagraph>
          </Element>
  )
}


export default AssociatedFinancialInstitutions;