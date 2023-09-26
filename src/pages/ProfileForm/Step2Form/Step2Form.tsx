import { useEffect } from 'react';
import useProfileForm from "store/useProfileForm";

import { Link, Notification } from 'design-system-react';
import Step2FormHeader from './Step2FormHeader';

interface Properties {
}

function Step2Form({}: Properties): JSX.Element {
  
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  const profileData = useProfileForm((state) => state.profileData);
  
  console.log("profileData: ", profileData);
  
  useEffect(()=>{
    window.scrollTo({ top: 0});
  }, []);

  return (
    <div>
      <Step2FormHeader />
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
        <h4 className="mb-2">Associated financial institutions</h4>
        {profileData.financialInstitutions.map(obj => {
          const success = Boolean(randomIntFromInterval(0, 1));
          return (
        <div className='mb-2 flex flex-row gap-[15px]'>
          <div className="min-w-[6.25rem]">
            <Notification isFieldLevel type={ success ? "success" : "warning"} message={ success ? "Approved" : "Pending"} />
          </div>
          <Link className="border-b" href={'#'}>{`${obj.name} | ${obj.lei}`}</Link>
        </div>
        )
        })}
      </div>
      
      
      
    </div>
  )
}

export default Step2Form