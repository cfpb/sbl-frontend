import { useParams } from 'react-router-dom';
import useUserProfile from './useUserProfile';

/**
 * @param targetLEI LEI from the URL
 * @param associatedLEIs LEIs the user is authorized to access
 */
export const isAssociatedWithLei = (
  targetLEI: string | undefined,
  associatedLEIs?: string[],
): boolean => {
  if (!targetLEI || !associatedLEIs || associatedLEIs.length === 0)
    return false;

  return associatedLEIs.includes(targetLEI);
};

/**
 * Checks if a user is authorized to access the target LEI
 */
export const useInstitutionVerifyAssociation = (): {
  isLoading: boolean;
  error: object | undefined;
  isAssociated: boolean;
} => {
  const { lei } = useParams();
  const { data: profile, error, isLoading } = useUserProfile();

  const isAssociated = isAssociatedWithLei(lei, profile?.institutions);

  return {
    isLoading,
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    error,
    isAssociated,
  };
};
