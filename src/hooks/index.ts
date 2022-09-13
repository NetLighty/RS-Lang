import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index-reducers';
import type { AppDispatch } from '../store/index';

// Use throughout your app instead of plain `useDispatch` and `useSelector` from https://redux.js.org/tutorials/typescript-quick-start

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
