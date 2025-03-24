import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addUser, getUser, updateUserById, deleteUserById } from '../services/userService';
import { showSuccessNotification } from '../../../utility/notification';

// **1. useGetUserQuery** for fetching user data
export const useGetUserQuery = (params) =>
  useQuery(
    ['users', params], // Unique key for the query
    async () => {
      const res = await getUser(params); // Fetching user data
      return {
        data: res.data.data, // Returning the list of users
        total: res.data.total, // Total count for pagination
      };
    },
    {
      enabled: !!params, // Make sure the query is only fired if params exist
      retry: 3, // Retry fetching data up to 3 times in case of failure
      onError: (error) => {
        console.error('Error fetching users:', error);
      },
    }
  );

// **2. useAddUserMutation** for adding a user
export const useAddUserMutation = () => {
  const queryClient = useQueryClient(); // To manage cache and refetch queries

  return useMutation(
    async (userData) => {
      const res = await addUser(userData); // Add the user
      return res.data; // Return the added user data
    },
    {
      onSuccess: (data) => {
        showSuccessNotification("User added successfully");
        queryClient.invalidateQueries('users'); // Invalidate and refetch users query after successful mutation
      },
      onError: (error) => {
        console.error('Error adding user:', error);
        // Optionally display a toast or alert for error feedback
      },
      onSettled: () => {
        // Optionally refetch data or perform cleanup actions
        console.log('Mutation settled (either success or failure)');
      },
    }
  );
};

// **3. useUpdateUserMutation** for updating an existing user
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient(); // Access to the query client for cache management

  return useMutation(
    async (updatedData) => {
      const res = await updateUserById(updatedData.id, updatedData); // Call to update the user data
      return res.data; // Return the updated user data
    },
    {
      onSuccess: (data) => {
        showSuccessNotification("User updated successfully");
        queryClient.invalidateQueries('users'); // Invalidate and refetch users query after successful mutation
      },
      onError: (error) => {
        console.error('Error updating user:', error); // Error logging
        // Optionally display a toast or alert for error feedback
      },
      onSettled: () => {
        // Optionally refetch data or perform cleanup actions
        console.log('Update mutation settled (either success or failure)');
      },
    }
  );
};

// **4. useDeleteUserMutation** for deleting a user
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient(); // Access the query client for cache management

  return useMutation(
    async (userId) => {
      const res = await deleteUserById(userId); // Call to delete the user by ID
      return res.data; // Return the response data
    },
    {
      onSuccess: () => {
        showSuccessNotification("User deleted successfully"); // Show success notification
        queryClient.invalidateQueries('users'); // Invalidate and refetch the users query after successful mutation
      },
      onError: (error) => {
        console.error('Error deleting user:', error); // Error logging
        // Optionally display a toast or alert for error feedback
      },
      onSettled: () => {
        // Optionally refetch data or perform cleanup actions
        console.log('Delete mutation settled (either success or failure)');
      },
    }
  );
};
