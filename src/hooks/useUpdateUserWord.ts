import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './index';
import { updateUserWord, createUserWord } from '../store/userWords.actions';
import SETTINGS from '~/utils/settings';
import { IUserWord, Options, UserWordsActions } from '~/models/IUserWord';
import { IWord } from '~/models/IWord';

export default function useUpdateUserWord() {
  const userWords = useAppSelector((state) => state.userWords);
  const dispatch = useAppDispatch();

  // TODO replace user and token when we get this information
  const updateWord = useCallback((word:IWord, data:Partial<Options>) => {
    const { result, dataupdate, game } = data;
    if (userWords[word.group] && userWords[word.group][word.page]) {
      const editWord:IUserWord | undefined = userWords[word.group][word.page]
        .find((item:IUserWord) => item.optional?.id === word.id);
      if (editWord && editWord.optional) {
        if (result === true) {
          editWord.optional.allAttemts += 1;
          editWord.optional.success += 1;
        } else if (result === false) {
          editWord.optional.allAttemts += 1;
        }
        if (dataupdate && game) {
          if (game === 'audiogame' && editWord.optional.audiogame === '0') {
            editWord.optional.audiogame = dataupdate;
          }
          if (game === 'sprint' && editWord.optional.sprint === '0') {
            editWord.optional.sprint = dataupdate;
          }
        }
        const wordForUpdate:IUserWord = {
          ...editWord,
          difficulty: editWord.difficulty || SETTINGS.NORMAL_WORD,
          optional: {
            ...editWord.optional,
            ...data,
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
    const defaultOptionalInfo:Options = {
      id: word.id,
      group: word.group,
      page: word.page,
      learned: false,
      result: false,
      success: 0,
      allAttemts: 0,
      dataupdate: '0',
      game: 'undefined',
      audiogame: '0',
      sprint: '0',
    };
    if (result === true) {
      defaultOptionalInfo.allAttemts += 1;
      defaultOptionalInfo.success += 1;
    } else if (result === false) {
      defaultOptionalInfo.allAttemts += 1;
    }
    if (dataupdate && game) {
      if (game === 'audiogame' && defaultOptionalInfo.audiogame === '0') {
        defaultOptionalInfo.audiogame = dataupdate;
      }
      if (game === 'sprint' && defaultOptionalInfo.sprint === '0') {
        defaultOptionalInfo.sprint = dataupdate;
      }
    }
    return dispatch(
      createUserWord(
        SETTINGS.USER_ID,
        word,
        SETTINGS.TOKEN,
        {
          difficulty: SETTINGS.NORMAL_WORD,
          optional: {
            ...defaultOptionalInfo,
            ...data,
          },
        },
      ) as unknown as UserWordsActions,
    );
  }, [dispatch, userWords]);

  // TODO replace user and token when we get this information
  const updateWordDifficulty = useCallback((word:IWord, data:Partial<IUserWord>) => {
    if (userWords[word.group] && userWords[word.group][word.page]) {
      const editWord:IUserWord | undefined = userWords[word.group][word.page]
        .find((item:IUserWord) => item.optional?.id === word.id);
      if (editWord && editWord.optional) {
        const wordForUpdate:IUserWord = {
          ...editWord,
          difficulty: data.difficulty || editWord.difficulty || SETTINGS.NORMAL_WORD,
          optional: {
            ...editWord.optional,
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
        },
      ) as unknown as UserWordsActions,
    );
  }, [dispatch, userWords]);

  return { updateWord, updateWordDifficulty };
}
