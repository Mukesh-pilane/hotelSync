import { useMutation, useQuery, useQueryClient } from 'react-query';
import { showSuccessNotification } from '../../../utility/notification';
import { addTransactionLog, getTransaction, deleteTransactionById, updateTransactionById } from '../services/transactionService';

// **1. useGetTransactionQuery** for fetching Transaction data
export const useGetTransactionQuery = (params) =>
  useQuery(
    ['transaction', params], // Unique key for the query
    async () => {
      const res = await getTransaction(params); // Fetching customer data
      return {
        data: res.data.data, // Returning the list of customers
        total: res.data.total, // Total count for pagination
      };
    },
    {
      enabled: !!params, // Make sure the query is only fired if params exist
      retry: 3, // Retry fetching data up to 3 times in case of failure
      onError: (error) => {
        console.error('Error fetching customers:', error);
      },
    }
  );

// **2. useTransactionLogMutation** - Adding a transaction
export const useTransactionLogMutation = () => {
    const queryClient = useQueryClient(); // Access to the query client for cache management

    return useMutation(
        async (hotelData) => {
            const res = await addTransactionLog(hotelData); // Call to add a new hotel
            return res.data; // Return the added hotel data
        },
        {
            onSuccess: (data) => {
                showSuccessNotification("Customer Added successfully")
                queryClient.invalidateQueries('transaction'); // Invalidate the hotels query to refetch data
            },
            onError: (error) => {
                console.error('Error adding hotel:', error); // Error logging
                // You might want to show a toast or UI feedback here
            },
            onSettled: () => {
                // Optionally refetch the hotels or trigger any other action after mutation
            },
        }
    );
};

// **3. useDeleteTransactionMutation** - Deleting a transaction by ID
export const useDeleteTransactionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (id) => {
            const res = await deleteTransactionById(id);
            return res.data;
        },
        {
            onSuccess: () => {
                showSuccessNotification("Transaction deleted successfully");
                queryClient.invalidateQueries('transaction');
            },
            onError: (error) => {
                console.error('Error deleting transaction:', error);
            },
        }
    );
};

// **4. useUpdateTransactionMutation** - Updating a transaction by ID
export const useUpdateTransactionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async ({ id, data }) => {
            const res = await updateTransactionById(id, data);
            return res.data;
        },
        {
            onSuccess: () => {
                showSuccessNotification("Transaction updated successfully");
                queryClient.invalidateQueries('transaction');
            },
            onError: (error) => {
                console.error('Error updating transaction:', error);
            },
        }
    );
};
