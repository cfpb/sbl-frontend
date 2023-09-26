import useProfileForm from "store/useProfileForm";

import Step2FormHeader from './Step2FormHeader';

interface Properties {
}

function Step2Form({}: Properties): JSX.Element {
  const profileData = useProfileForm((state) => state.profileData);
  
  console.log("profileData: ", profileData);

  return (
    <div>
      <Step2FormHeader />
      <h4>First Name</h4>
      
    </div>
  )
}

export default Step2Form