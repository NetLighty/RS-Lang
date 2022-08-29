import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { useAppSelector } from './index';
import { UserWordsActions } from '~/models/IUserWord';
import { getUserWords } from '../store/userWords.actions';

export default function useGetUserWords() {
  const dispatch = useDispatch();
  const userWords = useAppSelector((state) => state.userWords);

  const dowloadUserWords = useCallback((userId:string, userToken:string) => {
    if (Object.keys(userWords).length === 0) {
      dispatch(getUserWords(userId, userToken) as unknown as UserWordsActions);
    }
  }, [dispatch, userWords]);

  return { dowloadUserWords, userWords };
}
