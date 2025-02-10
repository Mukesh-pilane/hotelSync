import { useMutation } from 'react-query';
import { loginUser } from '../services/authService';

export const useLoginQuery = () =>
  useMutation(['login'], async (body) => {
    const res = await loginUser(body);
    return res;
  });