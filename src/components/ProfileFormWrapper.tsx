import type { ReactNode } from 'react';

interface Properties {
  children: ReactNode
}

function ProfileFormWrapper({children}: Properties): JSX.Element {
  return (
    <div className="ml-5 mr-5 mt-[45px]">
      <div className="max-w-[1200px] mx-auto mb-12">
        <div className="max-w-[770px] mx-auto">
          { children }
        </div>
      </div>
    </div>
  )
}

export default ProfileFormWrapper