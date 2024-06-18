import { useParams } from 'react-router-dom';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { useAssociatedInstitutions } from './useAssociatedInstitutions';

/**
 * @param targetLEI LEI from the URL
 * @param associatedInstitutions Institutions the user is authorized to access
 */
export const isAssociatedWithLei = (
  targetLEI: string | undefined,
  associatedInstitutions?: InstitutionDetailsApiType[],
): boolean => {
  if (
    !targetLEI ||
    !associatedInstitutions ||
    associatedInstitutions.length === 0
  )
    return false;

  return associatedInstitutions.some(
    institution => institution.lei === targetLEI,
  );
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

  const {
    data: associatedInstitutions,
    error,
    isLoading,
  } = useAssociatedInstitutions();

  const isAssociated = isAssociatedWithLei(lei, associatedInstitutions);

  return {
    isLoading,
    error,
    isAssociated,
  };
};
