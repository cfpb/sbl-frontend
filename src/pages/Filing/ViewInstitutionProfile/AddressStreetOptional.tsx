import type { ReactElement } from 'react';

function AddressStreetOptional({
  street,
}: {
  street: string | undefined;
}): ReactElement | null {
  if (!street || street.length === 0) return null;
  return (
    <>
      {street}
      <br />
    </>
  );
}

export default AddressStreetOptional;
