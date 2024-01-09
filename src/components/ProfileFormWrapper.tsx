import type { ReactNode } from 'react';

interface Properties {
  children: ReactNode
}

function ProfileFormWrapper({children}: Properties): JSX.Element {
  return (
    <div className="ml-5 mr-5 mt-[2.813rem]">
      <div className="max-w-[75rem] mx-auto mb-12">
        <div className="max-w-[48.125rem] mx-auto">
          { children }
        </div>
      </div>
    </div>
  )
}

export default ProfileFormWrapper