import { useMutation } from 'react-query';
import { addCustomer, getCustomers } from '../services/customersService';

export const useGetCustomerQuery = () =>
  useMutation(['books'], async (params) => {
    const res = await getCustomers(params);
    return {data: res.data.data, totalCount:res.data.totalCount};
  });


export const useAddCustomerMutation = () =>
  useMutation(
    ['addCustomer'], // Query key for this mutation
    async (customerData) => {
      const res = await addCustomer(customerData);
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