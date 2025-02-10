import { useMutation } from 'react-query';
import { getBooks } from '../services/booksService';
import { addBook } from '../services/booksService';

export const useGetBookQuery = () =>
  useMutation(['books'], async (params) => {
    const res = await getBooks(params);
    return {data: res.data.data, totalCount:res.data.totalCount};
  });


export const useAddBookMutation = () =>
  useMutation(
    ['addBook'], // Query key for this mutation
    async (bookData) => {
      const res = await addBook(bookData);
      return res.data; // Assuming the response has a data field with the added book
    },
    {
      onSuccess: () => {
        // Optionally refetch the list of books or perform other side effects
        console.log('Book added successfully');
      },
      onError: (error) => {
        console.error('Error adding book:', error);
      },
    }
  )