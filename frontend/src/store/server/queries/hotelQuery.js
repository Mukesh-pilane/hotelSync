import { useMutation } from 'react-query';
import { addHotel, getHotels } from '../services/hotelService';

export const useGetHotelQuery = () =>
  useMutation(['hotel'], async (params) => {
    const res = await getHotels(params);
    return {data: res.data.data, totalCount:res.data.totalCount};
  });


export const useAddHotelMutation = () =>
  useMutation(
    ['addHotel'], // Query key for this mutation
    async (hotelData) => {
      const res = await addHotel(hotelData);
      return res.data; // Assuming the response has a data field with the added book
    },
    {
      onSuccess: () => {
        console.log('Book added successfully');
      },
      onError: (error) => {
        console.error('Error adding book:', error);
      },
    }
  )