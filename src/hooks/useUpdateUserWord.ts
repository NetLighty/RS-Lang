import { useCallback } from 'react';
import formatDate from '~/utils/date';
import { useAppDispatch, useAppSelector } from './index';
import { updateUserWord, createUserWord } from '../store/userWords.actions';
import SETTINGS from '~/utils/settings';
import { IUserWord, Options, UserWordsActions } from '~/models/IUserWord';
import { IWord } from '~/models/IWord';
// import { getCookie, accesTokenName } from '~/utils/cookie';

export default function useUpdateUserWord() {
  const userWords = useAppSelector((state) => state.userWords);
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem('userId') as string;
  const userToken:string = localStorage.token as string;
  // TODO replace user and token when we get this information
  const updateWord = useCallback(
    (word: IWord, data: Partial<Options>) => {
      const { result, dataupdate, game } = data;
      if (userWords && userWords[word.group] && userWords[word.group][word.page]) {
        const editWord: IUserWord | undefined = userWords[word.group][word.page].find(
          (item: IUserWord) => item.optional?.id === word.id,
        );
        if (editWord && editWord.optional) {
          if (result === true) {
            editWord.optional.allAttemts += 1;
            editWord.optional.success += 1;
            editWord.optional.countSuccessInRow += 1;
            if (
              editWord.optional.countSuccessInRow === SETTINGS.COUNTSUCCESSINROW
              && editWord.difficulty === SETTINGS.NORMAL_WORD
            ) {
              editWord.optional.learned = true;
              editWord.optional.countSuccessInRow = 0;
            }
            if (
              editWord.optional.countSuccessInRow === SETTINGS.COUNTSUCCESSINROWHARD
              && editWord.difficulty === SETTINGS.HARD_WORD
            ) {
              editWord.optional.learned = true;
              editWord.optional.countSuccessInRow = 0;
            }
          } else if (result === false) {
            editWord.optional.allAttemts += 1;
          }
          if (dataupdate && editWord.optional.isThisFirst) {
            editWord.optional.firstDate = formatDate(dataupdate);
            editWord.optional.isThisFirst = false;
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
              userId,
              word,
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
        isThisFirst: true,
        firstDate: '0',
        dataupdate: new Date('1970-01-01'),
        game: 'undefined',
        audiogame: '0',
        sprint: '0',
      };
      if (result === true) {
        defaultOptionalInfo.allAttemts += 1;
        defaultOptionalInfo.success += 1;
        defaultOptionalInfo.countSuccessInRow += 1;
      } else if (result === false) {
        defaultOptionalInfo.allAttemts += 1;
      }
      if (dataupdate && defaultOptionalInfo.isThisFirst) {
        defaultOptionalInfo.firstDate = formatDate(dataupdate);
        defaultOptionalInfo.isThisFirst = false;
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
        createUserWord(userId, word, {
          difficulty: SETTINGS.NORMAL_WORD,
          optional: {
            ...defaultOptionalInfo,
            ...data,
          },
        }) as unknown as UserWordsActions,
      );
    },
    [dispatch, userWords, userId],
  );

  const updateWordDifficulty = useCallback(
    (word: IWord, data: Partial<IUserWord>) => {
      if (userWords && userWords[word.group] && userWords[word.group][word.page]) {
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
    [dispatch, userWords, userId, userToken],
  );

  return { updateWord, updateWordDifficulty };
}
