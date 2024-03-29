import type { ReactElement } from 'react';

function AddressStreet2({ street }: { street: string }): ReactElement | null {
  if (street.length === 0) return null;
  return (
    <>
      {street}
      <br />
    </>
  );
}

export default AddressStreet2;
