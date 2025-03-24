import { useQuery } from 'react-query';
import { getRole } from '../services/roleService';

export const useGetRoleQuery = (params) =>
  useQuery(
    ['roles', params], // Unique key for the query
    async () => {
      const res = await getRole(params); // Fetching role data
      return res.data.data 
    },
    {
      enabled: !!params, // Make sure the query is only fired if params exist
      retry: 3, // Retry fetching data up to 3 times in case of failure
      onError: (error) => {
        console.error('Error fetching roles:', error);
      },
    }
  );
