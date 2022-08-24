import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { UserWordsActions } from '~/models/IUserWord';
import SETTINGS from '~/utils/settings';
// import { RootState } from '../store/index.reducers';
import { getUserWords } from '../store/userWords.actions';
import { ID, TOKEN } from '~/utils/my';


export default function useGetUserWords() {
  const dispatch = useDispatch();
  // const useWords = useSelector((state:RootState) => state.userWords);
  // должна потом поменять назад
  const dowloadUserWords = useCallback(() => {
    // dispatch(getUserWords(SETTINGS.USER_ID, SETTINGS.TOKEN) as unknown as UserWordsActions);
    dispatch(getUserWords(ID, TOKEN) as unknown as UserWordsActions);
  }, [dispatch]);

  return { dowloadUserWords };
}
