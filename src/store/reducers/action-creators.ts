import AuthActionCreators from './auth/action-creator';
import SprintActionCreators from './sprint/action-creator';

const allActionCreators = {
  ...AuthActionCreators,
  ...SprintActionCreators,
};

export default allActionCreators;
