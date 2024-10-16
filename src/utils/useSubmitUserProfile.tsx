import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getRetries } from 'api/common';
import { submitUserProfile } from 'api/requests';
import useSblAuth from 'api/useSblAuth';
import type { AxiosError } from 'axios';
import type { FormattedUserProfileObjectType } from 'types/formTypes';
import { UPLOAD_SUBMIT_MAX_RETRIES } from './constants';

interface SubmitUserProfileProperties {
  userProfileObject: FormattedUserProfileObjectType;
}

const useSubmitUserProfile = (): UseMutationResult<
  null,
  AxiosError,
  SubmitUserProfileProperties
> => {
  const auth = useSblAuth();
  const email = auth.user?.profile.email;
  const queryClient = useQueryClient();

  return useMutation<null, AxiosError, SubmitUserProfileProperties>({
    mutationFn: async ({
      userProfileObject,
    }: SubmitUserProfileProperties): Promise<null> => {
      return submitUserProfile(auth, userProfileObject);
    },
    onSuccess: async () => {
      await auth.signinSilent();
      // cache busting
      await queryClient.invalidateQueries({
        queryKey: ['fetch-associated-institutions', email],
      });
      await queryClient.invalidateQueries({
        queryKey: ['fetch-user-profile', email],
      });
    },
    retry: getRetries(UPLOAD_SUBMIT_MAX_RETRIES),
  });
};

export default useSubmitUserProfile;
