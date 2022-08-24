import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './index';
import { updateUserWord, createUserWord } from '../store/userWords.actions';
import SETTINGS from '~/utils/settings';
import { IUserWord, UserWordsActions } from '~/models/IUserWord';
import { IWord } from '~/models/IWord';

export default function useUpdateUserWord() {
  const userWords = useAppSelector((state) => state.userWords);
  const dispatch = useAppDispatch();

  // TODO replace user and token when we get this information
  const updateWord = useCallback((word:IWord, data:Partial<IUserWord>) => {
    if (userWords[word.group] && userWords[word.group][word.page]) {
      const editWord:IUserWord | undefined = userWords[word.group][word.page]
        .find((item:IUserWord) => item.optional?.id === word.id);
      if (editWord && editWord.optional) {
        const wordForUpdate:IUserWord = {
          ...editWord,
          difficulty: data.difficulty || editWord.difficulty || SETTINGS.NORMAL_WORD,
          optional: {
            ...editWord.optional,
            ...data.optional,
          },
        };
        return dispatch(
          updateUserWord(
            SETTINGS.USER_ID,
            word,
            SETTINGS.TOKEN,
            wordForUpdate,
          ) as unknown as UserWordsActions,
        );
      }
    }
    return dispatch(
      createUserWord(
        SETTINGS.USER_ID,
        word,
        SETTINGS.TOKEN,
        {
          difficulty: data.difficulty || SETTINGS.NORMAL_WORD,
          optional: data.optional,
        },
      ) as unknown as UserWordsActions,
    );
  }, [dispatch, userWords]);

  return { updateWord };
}
