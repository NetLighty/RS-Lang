import { useDispatch } from 'react-redux';
import SETTINGS from '~/utils/settings';
// import { RootState } from '../store/index.reducers';
import { getUserWords } from '../store/userWords.actions';

export default function useGetUserWords() {
  const dispatch = useDispatch();
  // const useWords = useSelector((state:RootState) => state.userWords);

  const dowloadUserWords = () => dispatch(getUserWords(SETTINGS.USER_ID, SETTINGS.TOKEN) as any);

  return { dowloadUserWords };
}
