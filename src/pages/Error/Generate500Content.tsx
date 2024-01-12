import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// TODO: Delete this once Error500 is approved
export function Generate500Content(): ReactElement {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/500', {
      state: { errorMessage: 'The sky is falling...', statusCode: '500' },
    });
  }, [navigate]);
  return <div>Generating error...</div>;
}

export default Generate500Content;
