import formatDate from '~/utils/date';
import SETTINGS from '~/utils/settings';
import { Options, IUserWord } from '~/models/IUserWord';

function checkChangedWord(
  options: Options | undefined,
  difficulty: string,
  data: Partial<Options>,
  updateStatistic:()=>void,
) {
  const {
    result, dataupdate, game, learned,
  } = data;

  let newEditWord: IUserWord | undefined;
  if (options) {
    newEditWord = {
      difficulty,
      optional: {
        ...options,
      },
    };
    if (newEditWord && newEditWord.optional) {
      if (learned === true) {
        updateStatistic();
      }
      if (result === true) {
        newEditWord.optional.allAttemts += 1;
        newEditWord.optional.success += 1;
        newEditWord.optional.countSuccessInRow += 1;
        if (
          newEditWord.optional.countSuccessInRow === SETTINGS.COUNTSUCCESSINROW
          && newEditWord.difficulty === SETTINGS.NORMAL_WORD
        ) {
          newEditWord.optional.learned = true;
          newEditWord.optional.countSuccessInRow = 0;
          updateStatistic();
        }
        if (
          newEditWord.optional.countSuccessInRow === SETTINGS.COUNTSUCCESSINROWHARD
          && newEditWord.difficulty === SETTINGS.HARD_WORD
        ) {
          newEditWord.optional.learned = true;
          newEditWord.optional.countSuccessInRow = 0;
          newEditWord.difficulty = SETTINGS.NORMAL_WORD;
          updateStatistic();
        }
      } else if (result === false) {
        newEditWord.optional.allAttemts += 1;
        newEditWord.optional.countSuccessInRow = 0;
        if (newEditWord.optional.learned === true) {
          newEditWord.optional.learned = false;
        }
      }
      if (dataupdate && newEditWord.optional.isThisFirst) {
        newEditWord.optional.firstDate = formatDate(dataupdate);
        newEditWord.optional.isThisFirst = false;
      }
      if (dataupdate && game) {
        if (game === 'audiogame' && newEditWord.optional.audiogame === '0') {
          newEditWord.optional.audiogame = formatDate(dataupdate);
        }
        if (game === 'sprint' && newEditWord.optional.sprint === '0') {
          newEditWord.optional.sprint = formatDate(dataupdate);
        }
      }

      if (learned === true && newEditWord.difficulty === SETTINGS.HARD_WORD) {
        newEditWord.optional.learned = true;
        newEditWord.difficulty = SETTINGS.NORMAL_WORD;
      }
    }
  }
  return newEditWord;
}

export default checkChangedWord;
