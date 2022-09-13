import {
  AuthAction, AuthActionEnum, AuthState, CurrentUser,
} from './types';

const initialState: AuthState = {
  isAuth: false,
  error: '',
  regError: '',
  user: {} as CurrentUser,
  isLoading: false,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function authReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionEnum.SET_AUTH:
      return { ...state, isAuth: action.payload, isLoading: false };
    case AuthActionEnum.SET_USER:
      return { ...state, user: action.payload };
    case AuthActionEnum.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case AuthActionEnum.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case AuthActionEnum.SET_REGISTRATION_ERROR:
      return { ...state, regError: action.payload, isLoading: false };
    default:
      return state;
  }
}
