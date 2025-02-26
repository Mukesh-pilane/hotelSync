import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addCustomer, getCustomers, updateCustomer, deleteCustomer } from '../services/customersService';
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

// **3. useUpdateCustomerMutation** for updating an existing customer
export const useUpdateCustomerMutation = () => {
  const queryClient = useQueryClient(); // Access to the query client for cache management

  return useMutation(
    async (updatedData) => {
      const res = await updateCustomer(updatedData); // Call to update the customer data
      return res.data; // Return the updated customer data
    },
    {
      onSuccess: (data) => {
        showSuccessNotification("Customer updated successfully");
        queryClient.invalidateQueries('customers'); // Invalidate and refetch customers query after successful mutation
      },
      onError: (error) => {
        console.error('Error updating customer:', error); // Error logging
        // Optionally display a toast or alert for error feedback
      },
      onSettled: () => {
        // Optionally refetch data or perform cleanup actions
        console.log('Update mutation settled (either success or failure)');
      },
    }
  );
};



// **4. useDeleteCustomerMutation** for deleting a customer
export const useDeleteCustomerMutation = () => {
  const queryClient = useQueryClient(); // Access the query client for cache management

  return useMutation(
    async (customerId) => {
      const res = await deleteCustomer(customerId); // Call to delete the customer by ID
      return res.data; // Return the response data
    },
    {
      onSuccess: () => {
        showSuccessNotification("Customer deleted successfully"); // Show success notification
        queryClient.invalidateQueries('customers'); // Invalidate and refetch the customers query after successful mutation
      },
      onError: (error) => {
        console.error('Error deleting customer:', error); // Error logging
        // Optionally display a toast or alert for error feedback
      },
      onSettled: () => {
        // Optionally refetch data or perform cleanup actions
        console.log('Delete mutation settled (either success or failure)');
      },
    }
  );
};
