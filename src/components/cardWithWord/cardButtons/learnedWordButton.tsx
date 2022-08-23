import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { IWord } from '~/models/IWord';
import { createUserWord } from '~/store/userWords.actions';
import SETTINGS from '~/utils/settings';

interface LearnedButtonProps {
  word: IWord;
}

const LearnedWordButton:FC<LearnedButtonProps> = ({ word }) => {
  const dispatch = useDispatch();

  // TODO DELETE for testing
  // function loginUserId (){
  // loginUser({ "email": "hello@user.com", "password": "Gfhjkm_123" });
  //   {
  //     "message": "Authenticated",
  //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDQ5NTQxM2M2YjYwMDAxNjcyYjhlNiIsImlhdCI6MTY2MTI0NDk2MCwiZXhwIjoxNjYxMjU5MzYwfQ.XIaKQoTn3XdLJFW0w7o9Pao5IrkCilqMdPpzUxVYE7s",
  //     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDQ5NTQxM2M2YjYwMDAxNjcyYjhlNiIsInRva2VuSWQiOiI4ODZkYmRmZC0xMjQ1LTQ3ODItYWRiZS00MmE3ZWE1Y2UwM2MiLCJpYXQiOjE2NjEyNDQ5NjAsImV4cCI6MTY2MTI2MTE2MH0.SLCC5hnEIkVeHrhfihbq_ZrtsrZbdwdiI3p1ksgZoTE",
  //     "userId": "630495413c6b60001672b8e6"
  // }
  // }

  function toggleLearned(word:IWord) {
    dispatch(createUserWord(SETTINGS.USER_ID, word, SETTINGS.TOKEN, { difficulty: 'hard' }) as any);
  }
  return (
    <button type="button" className="_icon-true1 card__button" aria-label="I know this word" onClick={() => toggleLearned(word)} />
  );
};

export default LearnedWordButton;
