import {
  IUserWord, UserWordsActions, UsersWordsStateType,
  AddUserWordsActionsTypes, AddUserWordsIdActionsTypes,
} from '~/models/IUserWord';

const initialState:UsersWordsStateType = {};

// turn off rule 'default-param-last' becase of reducer, I can't replace param
export default function userWordsReducer(
  /* eslint-disable */
  state:UsersWordsStateType = initialState, 
  action:UserWordsActions
  /* eslint-disable */
  ) {

  if(action.type === AddUserWordsActionsTypes.ADD_USER_WORDS_TO_STORE){
    const userWords:UsersWordsStateType = {};
     action.payload.forEach((item:IUserWord) => {
      if(item.optional){
        if(!userWords[item.optional.group]) userWords[item.optional.group] = {}
        if(!Array.isArray(userWords[item.optional.group][item.optional.page])) userWords[item.optional.group][item.optional.page] = []
				userWords[item.optional.group][item.optional.page].push(item);
      }})
     return {...state, ...userWords};
  } else if (action.type === AddUserWordsIdActionsTypes.ADD_USER_WORD_TO_STORE){
    const userWords = {...state}
    if(action.payload.optional) {
    const {group, page} = action.payload.optional;
    if(!userWords[group]) {userWords[group] = {}}
    if(!Array.isArray(userWords[group][page])) {
      userWords[group][page] = [action.payload];
    } else {
      const index = userWords[group][page].findIndex(item => item.optional?.id === action.payload.optional?.id);
      if(index >=0){
        userWords[group][page][index] = {
          ...userWords[group][page][index],
          ...action.payload,
          optional:{
            ... userWords[group][page][index].optional,
            ...action.payload.optional
          }
        }
      }else {
        userWords[group][page].push(action.payload)
      }
    }

    }
    return {...state, ...userWords};
  } else {
    return state;
  }
  
}
