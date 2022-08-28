import { useCallback } from 'react';
import formatDate from '~/utils/date';
import { useAppDispatch, useAppSelector } from './index';
import { updateUserWord, createUserWord } from '../store/userWords.actions';
import SETTINGS from '~/utils/settings';
import { IUserWord, Options, UserWordsActions } from '~/models/IUserWord';
import { IWord } from '~/models/IWord';

export default function useUpdateUserWord() {
  const userWords = useAppSelector((state) => state.userWords);
  const dispatch = useAppDispatch();

  // TODO replace user and token when we get this information
  const updateWord = useCallback(
    (word: IWord, data: Partial<Options>) => {
      const { result, dataupdate, game } = data;
      if (userWords[word.group] && userWords[word.group][word.page]) {
        const editWord: IUserWord | undefined = userWords[word.group][word.page].find(
          (item: IUserWord) => item.optional?.id === word.id,
        );
        if (editWord && editWord.optional) {
          if (result === true) {
            editWord.optional.allAttemts += 1;
            editWord.optional.success += 1;
            editWord.optional.countSuccessInRow += 1;
            if (
              editWord.optional.countSuccessInRow === SETTINGS.COUNTSUCCESSINROW &&
              editWord.difficulty === SETTINGS.NORMAL_WORD
            ) {
              editWord.optional.learned = true;
              editWord.optional.countSuccessInRow = 0;
            }
            if (
              editWord.optional.countSuccessInRow === SETTINGS.COUNTSUCCESSINROWHARD &&
              editWord.difficulty === SETTINGS.HARD_WORD
            ) {
              editWord.optional.learned = true;
              editWord.optional.countSuccessInRow = 0;
            }
          } else if (result === false) {
            editWord.optional.allAttemts += 1;
          }
          if (dataupdate && game) {
            if (game === 'audiogame' && editWord.optional.audiogame === '0') {
              editWord.optional.audiogame = formatDate(dataupdate);
            }
            if (game === 'sprint' && editWord.optional.sprint === '0') {
              editWord.optional.sprint = formatDate(dataupdate);
            }
          }

          const wordForUpdate: IUserWord = {
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
      const defaultOptionalInfo: Options = {
        id: word.id,
        group: word.group,
        page: word.page,
        learned: false,
        result: false,
        countSuccessInRow: 0,
        success: 0,
        allAttemts: 0,
        dataupdate: new Date('1970-01-01'),
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
          defaultOptionalInfo.audiogame = formatDate(dataupdate);
        }
        if (game === 'sprint' && defaultOptionalInfo.sprint === '0') {
          defaultOptionalInfo.sprint = formatDate(dataupdate);
        }
      }
      return dispatch(
        createUserWord(SETTINGS.USER_ID, word, SETTINGS.TOKEN, {
          difficulty: SETTINGS.NORMAL_WORD,
          optional: {
            ...defaultOptionalInfo,
            ...data,
          },
        }) as unknown as UserWordsActions,
      );
    },
    [dispatch, userWords],
  );

  // TODO replace user and token when we get this information
  const updateWordDifficulty = useCallback(
    (word: IWord, data: Partial<IUserWord>) => {
      if (userWords[word.group] && userWords[word.group][word.page]) {
        const editWord: IUserWord | undefined = userWords[word.group][word.page].find(
          (item: IUserWord) => item.optional?.id === word.id,
        );
        if (editWord && editWord.optional) {
          const wordForUpdate: IUserWord = {
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
        createUserWord(SETTINGS.USER_ID, word, SETTINGS.TOKEN, {
          difficulty: data.difficulty || SETTINGS.NORMAL_WORD,
        }) as unknown as UserWordsActions,
      );
    },
    [dispatch, userWords],
  );

  return { updateWord, updateWordDifficulty };
}
