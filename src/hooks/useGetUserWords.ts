import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { useAppSelector } from './index';
import { UserWordsActions } from '~/models/IUserWord';
import { getUserWords, deleteUserWordsFromStore } from '../store/userWords.actions';

export default function useGetUserWords() {
  const dispatch = useDispatch();
  const userWords = useAppSelector((state) => state.userWords);

  const dowloadUserWords = useCallback((userId:string, userToken:string) => {
    dispatch(getUserWords(userId, userToken) as unknown as UserWordsActions);
  }, [dispatch]);

  const deleteUserWords = () => {
    dispatch(deleteUserWordsFromStore() as unknown as UserWordsActions);
  };

  return { dowloadUserWords, userWords, deleteUserWords };
}
