import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '~/store/index-reducers';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
