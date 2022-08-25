import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { useAppSelector } from './index';
import { UserWordsActions } from '~/models/IUserWord';
import SETTINGS from '~/utils/settings';
import { getUserWords } from '../store/userWords.actions';

export default function useGetUserWords() {
  const dispatch = useDispatch();
  const userWords = useAppSelector((state) => state.userWords);

  const dowloadUserWords = useCallback(() => {
    if (Object.keys(userWords).length === 0) {
      dispatch(getUserWords(SETTINGS.USER_ID, SETTINGS.TOKEN) as unknown as UserWordsActions);
    }
  }, [dispatch, userWords]);

  return { dowloadUserWords, userWords };
}
