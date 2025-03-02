import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addHotel, getHotels, deleteHotelById, updateHotelById } from '../services/hotelService';
import { showSuccessNotification } from '../../../utility/notification';

// **1. useGetHotelQuery** - Fetching hotel data
export const useGetHotelQuery = (params) => 
  useQuery(
    ['hotels', params], // Unique key for the query (params could be page, filters, etc.)
    async () => {
      const res = await getHotels(params); // Fetch the hotel data
      return {
        data: res.data.data, // Returning the hotels data
        totalCount: res.data.totalCount, // Returning total count for pagination
      };
    },
    {
      enabled: !!params, // Ensures the query runs only if `params` exists
      retry: 3, // Retry fetching the data up to 3 times on failure
      onError: (error) => {
        console.error('Error fetching hotels:', error); // Optional logging
      },
    }
  );

// **2. useAddHotelMutation** - Adding a hotel
export const useAddHotelMutation = () => {
  const queryClient = useQueryClient(); // Access to the query client for cache management

  return useMutation(
    async (hotelData) => {
      const res = await addHotel(hotelData); // Call to add a new hotel
      return res.data; // Return the added hotel data
    },
    {
      onSuccess: (data) => {
        showSuccessNotification(data?.message)
        queryClient.invalidateQueries('hotels'); // Invalidate the hotels query to refetch data
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

// **3. useDeleteHotelMutation** - Deleting a hotel by ID
export const useDeleteHotelMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const res = await deleteHotelById(id);
      return res.data;
    },
    {
      onSuccess: () => {
        showSuccessNotification("Hotel deleted successfully");
        queryClient.invalidateQueries('hotels');
      },
      onError: (error) => {
        console.error('Error deleting hotel:', error);
      },
    }
  );
};

// **4. useUpdateHotelMutation** - Updating a hotel by ID
export const useUpdateHotelMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, data }) => {
      const res = await updateHotelById(id, data);
      return res.data;
    },
    {
      onSuccess: () => {
        showSuccessNotification("Hotel updated successfully");
        queryClient.invalidateQueries('hotels');
      },
      onError: (error) => {
        console.error('Error updating hotel:', error);
      },
    }
  );
};
