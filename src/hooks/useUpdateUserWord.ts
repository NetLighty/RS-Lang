import { useCallback } from 'react';
import { IAggregated } from '~/models/IAggregated';
import { useAppDispatch, useAppSelector } from './index';
import { updateUserWord, createUserWord } from '../store/userWords.actions';
import SETTINGS from '~/utils/settings';
import { IUserWord, Options, UserWordsActions } from '~/models/IUserWord';
import { IWord } from '~/models/IWord';
import checkChangedWord from '~/utils/checkChangedWord';

export default function useUpdateUserWord() {
  const userWords = useAppSelector((state) => state.userWords);
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem('userId') as string;

  const updateWord = useCallback(
    (word: IWord, data: Partial<Options>) => {
      if (userWords && userWords[word.group] && userWords[word.group][word.page]) {
        let wordForUpdate: IUserWord | undefined;
        const editWord: IUserWord | undefined = userWords[word.group][word.page].find(
          (item: IUserWord) => item.optional?.id === word.id,
        );
        if (editWord && editWord.optional) {
          const newEditWord: IUserWord | undefined = checkChangedWord(
            editWord.optional,
            editWord.difficulty,
            data,
          );
          if (newEditWord && newEditWord.optional) {
            wordForUpdate = {
              ...newEditWord,
              difficulty: newEditWord.difficulty || SETTINGS.NORMAL_WORD,
              optional: {
                ...newEditWord.optional,
                ...data,
              },
            };
          }
          return dispatch(
            updateUserWord(userId, word, wordForUpdate as IUserWord) as unknown as UserWordsActions,
          );
        }
      }
      const defaultOptionalInfo: Options = {
        id: word.id,
        group: word.group,
        page: word.page,
        learned: false,
        result: false,
        countSuccessInRow: 0,
        success: 0,
        allAttemts: 0,
        isThisFirst: true,
        firstDate: '0',
        dataupdate: new Date('1970-01-01'),
        game: 'undefined',
        audiogame: '0',
        sprint: '0',
      };
      const newEditWord = checkChangedWord(
        defaultOptionalInfo,
        SETTINGS.NORMAL_WORD,
        data,
      ) as IUserWord;

      return dispatch(
        createUserWord(userId, word, {
          difficulty: SETTINGS.NORMAL_WORD,
          optional: {
            ...(newEditWord.optional as Options),
            ...data,
          },
        }) as unknown as UserWordsActions,
      );
    },
    [dispatch, userWords, userId],
  );

  const updateWordDifficulty = useCallback(
    (word: IWord | IAggregated, data: Partial<IUserWord>) => {
      if (userWords && userWords[word.group] && userWords[word.group][word.page]) {
        const editWord: IUserWord | undefined = userWords[word.group][word.page].find(
          (item: IUserWord) => item.optional?.id === word.id,
        );
        if (editWord && editWord.optional) {
          if (data.difficulty === SETTINGS.HARD_WORD && editWord.optional.learned === true) {
            editWord.optional.learned = false;
          }
          const wordForUpdate: IUserWord = {
            ...editWord,
            difficulty: data.difficulty || editWord.difficulty || SETTINGS.NORMAL_WORD,
            optional: {
              ...editWord.optional,
            },
          };
          return dispatch(
            updateUserWord(
              localStorage.userId as string,
              word,
              wordForUpdate,
            ) as unknown as UserWordsActions,
          );
        }
      }
      return dispatch(
        createUserWord(localStorage.userId as string, word, {
          difficulty: data.difficulty || SETTINGS.NORMAL_WORD,
        }) as unknown as UserWordsActions,
      );
    },
    [dispatch, userWords],
  );

  return { updateWord, updateWordDifficulty };
}
