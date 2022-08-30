import {
  AuthActionEnum, CurrentUser, SetAuthAction, SetErrorAction, SetLoadingAction,
  SetRegistrationErrorAction, SetUserAction,
} from './types';

const AuthActionCreators = {
  setUser: (user: CurrentUser): SetUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
  setIsAuth: (auth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_AUTH, payload: auth }),
  setIsLoading: (loading: boolean): SetLoadingAction => (
    { type: AuthActionEnum.SET_LOADING, payload: loading }
  ),
  setError: (error: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload: error }),
  setRegistrationError: (error: string): SetRegistrationErrorAction => ({
    type: AuthActionEnum.SET_REGISTRATION_ERROR, payload: error,
  }),
};

export default AuthActionCreators;
