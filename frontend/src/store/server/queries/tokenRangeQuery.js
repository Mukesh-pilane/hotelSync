import { useMutation, useQuery, useQueryClient } from 'react-query';
import { showSuccessNotification } from '../../../utility/notification';
import { addTokenRange, getTokenRange, deleteTokenRangeById, updateTokenRangeById } from '../services/tokenRangeService';

// **1. useGetTokenRangeQuery** for fetching TokenRange data
export const useGetTokenRangeQuery = (params) =>
  useQuery(
    ['tokenRange', params], // Unique key for the query
    async () => {
      const res = await getTokenRange(params); // Fetching token range data
      return {
        data: res.data.data, // Returning the list of token ranges
        totalCount: res.data.totalCount, // Total count for pagination
      };
    },
    {
      enabled: !!params, // Make sure the query is only fired if params exist
      retry: 3, // Retry fetching data up to 3 times in case of failure
      onError: (error) => {
        console.error('Error fetching token ranges:', error);
      },
    }
  );

// **2. useAddTokenRangeMutation** - Adding a token range
export const useAddTokenRangeMutation = () => {
    const queryClient = useQueryClient(); // Access to the query client for cache management

    return useMutation(
        async (tokenRangeData) => {
            const res = await addTokenRange(tokenRangeData); // Call to add a new token range
            return res.data; // Return the added token range data
        },
        {
            onSuccess: (data) => {
                showSuccessNotification("Token Range Added successfully")
                queryClient.invalidateQueries('tokenRange'); // Invalidate the token ranges query to refetch data
            },
            onError: (error) => {
                console.error('Error adding token range:', error); // Error logging
                // You might want to show a toast or UI feedback here
            },
            onSettled: () => {
                // Optionally refetch the token ranges or trigger any other action after mutation
            },
        }
    );
};

// **3. useDeleteTokenRangeMutation** - Deleting a token range by ID
export const useDeleteTokenRangeMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (id) => {
            const res = await deleteTokenRangeById(id);
            return res.data;
        },
        {
            onSuccess: () => {
                showSuccessNotification("Token Range deleted successfully");
                queryClient.invalidateQueries('tokenRange');
            },
            onError: (error) => {
                console.error('Error deleting token range:', error);
            },
        }
    );
};

// **4. useUpdateTokenRangeMutation** - Updating a token range by ID
export const useUpdateTokenRangeMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async ({ id, data }) => {
            const res = await updateTokenRangeById(id, data);
            return res.data;
        },
        {
            onSuccess: () => {
                showSuccessNotification("Token Range updated successfully");
                queryClient.invalidateQueries('tokenRange');
            },
            onError: (error) => {
                console.error('Error updating token range:', error);
            },
        }
    );
};
