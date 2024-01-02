import { useEffect } from 'react';
import useProfileForm from "store/useProfileForm";

import { Link, Alert } from 'design-system-react';
import Step2FormHeader from './Step2FormHeader';

import { Step2FormHeaderMessages } from './Step2FormHeader.data';

interface Properties {
}

function Step2Form({}: Properties): JSX.Element {
  const selectedScenario = useProfileForm((state) => state.selectedScenario);
    
  useEffect(()=>{
    window.scrollTo({ top: 0});
  }, []);
    
  return (
    <div id="step2form">
      <Step2FormHeader scenario={selectedScenario} />
    </div>
  )
}

export default Step2Form;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function SummaryProfile({}: Properties): JSX.Element {
  const profileData = useProfileForm((state) => state.profileData);
  
  console.log("Step 2 Form profileData:", profileData);

  return (
    <>
      <h3 className='mb-[30px]'>User profile details</h3>
      <div className='mb-[30px]'>
        <h4 className="mb-2">First name</h4>
        <p>{profileData.firstName}</p>
      </div>
      <div className='mb-[30px]'>
        <h4 className="mb-2">Last name</h4>
        <p>{profileData.lastName}</p>
      </div>
      <div className='mb-[30px]'>
        <h4 className="mb-2">Email address</h4>
        <p>{profileData.email}</p>
      </div>
      <div className='mb-[30px]'>
        <h4 className="mb-2">Associated financial institution(s)</h4>
        {profileData ? profileData.financialInstitutions.map(object => {
          const success = Boolean(randomIntFromInterval(0, 1));
          return (
        <div key={object.lei} className='mb-2 flex flex-row gap-[0.9375rem]'>
          <div className="min-w-[6.25rem]">
            <Alert isFieldLevel status={ success ? "success" : "warning"} message={ success ? "Approved" : "Pending"} />
          </div>
          <Link className="border-b" href="#">{`${object.name} | ${object.lei}`}</Link>
        </div>
        )
        })
        :
        null
        }
      </div>
    </>
  );
}