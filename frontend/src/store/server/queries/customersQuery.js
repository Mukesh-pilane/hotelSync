import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addCustomer, addTransactionLog, getCustomers } from '../services/customersService';
import { showSuccessNotification } from '../../../utility/notification';

// **1. useGetCustomerQuery** for fetching customer data
export const useGetCustomerQuery = (params) =>
  useQuery(
    ['customers', params], // Unique key for the query
    async () => {
      const res = await getCustomers(params); // Fetching customer data
      return {
        data: res.data.data, // Returning the list of customers
        totalCount: res.data.totalCount, // Total count for pagination
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

// **2. useAddCustomerMutation** for adding a customer
export const useAddCustomerMutation = () => {
  const queryClient = useQueryClient(); // To manage cache and refetch queries

  return useMutation(
    async (customerData) => {
      const res = await addCustomer(customerData); // Add the customer
      return res.data; // Return the added customer data
    },
    {
      onSuccess: (data) => {
        showSuccessNotification("Customer Added successfully")
        queryClient.invalidateQueries('customers'); // Invalidate and refetch customers query after successful mutation
      },
      onError: (error) => {
        console.error('Error adding customer:', error);
        // Optionally display a toast or alert for error feedback
      },
      onSettled: () => {
        // Optionally refetch data or perform cleanup actions
        console.log('Mutation settled (either success or failure)');
      },
    }
  );
};


// **2. useAddHotelMutation** - Adding a hotel
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
        queryClient.invalidateQueries('customers'); // Invalidate the hotels query to refetch data
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
