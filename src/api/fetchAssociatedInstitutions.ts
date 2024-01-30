import axios, { AxiosError } from 'axios';
import { ValidationError } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'pages/Filing/InstitutionDetails/institutionDetails.type';

export const fetchAssociatedInstitutions = async (
  auth: SblAuthProperties,
): Promise<InstitutionDetailsApiType[]> => {
  
    try {
      const { data, status } = await axios.get<InstitutionDetailsApiType[]>(`/v1/institutions/associated`, {
        headers: { Authorization: `Bearer ${auth.user?.access_token}`, Accept: 'application/json' }
      });
      return data;
      
    } catch (error: Error | AxiosError) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        // Access to config, request, and response
        console.log(error.status)
        console.error(error.response);
        // Do something with this error...
      } else {
        // standard error
        console.error(error);
      }
      throw error;
    }

};

export default fetchAssociatedInstitutions;


// type GetUsersResponse = {
//   data: User[];
// };

// async function getUsers() {
//   try {
//     // 👇️ const data: GetUsersResponse
//     const { data, status } = await axios.get<GetUsersResponse>(
//       'https://reqres.in/api/users',
//       {
//         headers: {
//           Accept: 'application/json',
//         },
//       },
//     );

//     console.log(JSON.stringify(data, null, 4));

//     // 👇️ "response status is: 200"
//     console.log('response status is: ', status);

//     return data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log('error message: ', error.message);
//       return error.message;
//     } else {
//       console.log('unexpected error: ', error);
//       return 'An unexpected error occurred';
//     }
//   }
// }

// getUsers();
