import { IUserWord } from '../models/IUserWord';
import { useAppSelector } from './index';
import SETTINGS from '~/utils/settings';
import { IStatistic } from '../models/IStatistic';
import formatDate from '~/utils/date';
import UserService from '~/api/userService';

export default function useStatistics() {
  const userWords = useAppSelector((state) => state.userWords);
  function writeStatistic(statistic: IStatistic) {
    UserService.upsertUserStat(localStorage.getItem('userId') as string, statistic)
      .then(() => {})
      .catch(() => {});
    localStorage.setItem('statistics', JSON.stringify(statistic));
  }

  const getStatistic = (id: string) => {
    UserService.getUserStat(id)
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem('statistics', JSON.stringify(data.data));
        }
      })
      .catch(() => {
        localStorage.setItem('statistics', SETTINGS.STATISTIC_MESSAGE);
      });
  };

  const updateStatistic = () => {
    const statistic = localStorage.getItem('statistics');
    if (statistic && statistic !== SETTINGS.STATISTIC_MESSAGE) {
      const oldStatistic = JSON.parse(statistic) as IStatistic;
      const key = formatDate(new Date());
      if (oldStatistic && oldStatistic.optional) {
        const statisticKeys = Object.keys(oldStatistic.optional);
        if (statisticKeys.findIndex((item) => item === key) === -1) {
          oldStatistic.optional[key] = 1;
          oldStatistic.learnedWords += 1;
        } else {
          statisticKeys.forEach((item) => {
            if (oldStatistic.optional) {
              if (item === key) {
                oldStatistic.optional[item] += 1;
                oldStatistic.learnedWords += 1;
              }
            }
          });
        }
        const newStatistic: IStatistic = {
          learnedWords: oldStatistic.learnedWords,
          optional: {
            ...oldStatistic.optional,
          },
        };
        writeStatistic(newStatistic);
      }
    } else {
      const key = formatDate(new Date());
      const newStatistic: IStatistic = {
        learnedWords: 1,
        optional: {
          [key]: 1,
        },
      };
      writeStatistic(newStatistic);
    }
  };

  const countNewWords = () => {
    const userWordsArray: Array<IUserWord> = [];
    if (userWords) {
      Object.keys(userWords).forEach((group) => {
        Object.keys(userWords[Number(group)]).forEach((page) => {
          userWords[Number(group)][Number(page)].forEach((word) => {
            userWordsArray.push(word);
          });
        });
      });
    }
    const newWordsObject = userWordsArray
      .filter((word) => word.optional?.isThisFirst === false)
      .reduce((acc: Record<string, number>, word: IUserWord): Record<string, number> => {
        if (word.optional) {
          acc[word.optional?.firstDate] = (acc[word.optional?.firstDate] || 0) + 1;
        }
        return acc;
      }, {});
    return newWordsObject;
  };

  return { getStatistic, updateStatistic, countNewWords };
}
