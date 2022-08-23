import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { IWord } from '~/models/IWord';
import { createUserWord, getUserWordsById, updateUserWord } from '~/store/userWords.actions';
import SETTINGS from '~/utils/settings';

interface LearnedButtonProps {
  word: IWord;
}

const LearnedWordButton:FC<LearnedButtonProps> = ({ word }) => {
  const dispatch = useDispatch();

  // TODO DELETE for testing
  // function loginUserId (){
  // loginUser({ "email": "hello@user.com", "password": "Gfhjkm_123" });
  // }

  async function toggleLearned(word:IWord) {
   const data = await getUserWordsById(SETTINGS.USER_ID, word.id, SETTINGS.TOKEN);
   if(data) {
    dispatch(updateUserWord(SETTINGS.USER_ID, word, SETTINGS.TOKEN, { difficulty: 'light' }) as any);
   } else {
    dispatch(createUserWord(SETTINGS.USER_ID, word, SETTINGS.TOKEN, { difficulty: 'hard' }) as any);
   }
  }
  return (
    <button type="button" className="_icon-true1 card__button" aria-label="I know this word" onClick={() => toggleLearned(word)} />
  );
};

export default LearnedWordButton;
