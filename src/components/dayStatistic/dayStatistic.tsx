import React, { FC, useEffect, useState } from 'react';
import { IAggregatedResponse } from '~/models/IAggregated';
import { ISettingsRes } from '~/models/ISetting';
import { getAggregatedWordsForStatistic } from '~/utils/aggregatedWordsFunc';
import formatDate from '~/utils/date';
import { IStatistic } from '../../models/IStatistic';
// eslint-disable-next-line import/extensions
import { getSettingsData } from '~/utils/setting.action';
import './dayStatistic.scss';

const DayStatistic: FC = () => {
  const [percent, setPercent] = useState(0);
  const [learnWords, setLearnWords] = useState(0);
  const [newDayWords, setNewDayWords] = useState(0);
  const stat = localStorage.getItem('statistics') !== 'Statistic is empty'
    ? JSON.parse(localStorage.getItem('statistics') as string) as IStatistic
    : {
      learnedWords: 0,
    };

  let flag = true;
  async function fetchStatisticDay(id: string) {
    flag = false;
    const response = (await getSettingsData(id));
    const data = response as ISettingsRes;
    if (data.optional && data.optional.dataSettings === formatDate(new Date())) {
      const totalCount = data.optional.audioTotalCount + data.optional.sprintTotalCount;
      // eslint-disable-next-line no-unsafe-optional-chaining
      const seccessWords = data.optional?.audioSuccess + data.optional?.sprintSuccess;
      if (totalCount !== 0) {
        setPercent(Math.ceil(
          (seccessWords * 100) / totalCount,
        ));
      }
      const date = new Date();
      const filter = `{"userWord.optional.firstDate":"${formatDate(date)}"}`;
      const newWordsResp = (await getAggregatedWordsForStatistic(id, filter));
      const newWords: IAggregatedResponse[] = newWordsResp as IAggregatedResponse[];
      setNewDayWords(newWords[0].totalCount[0].count);
    }
    if (stat.learnedWords !== 0) {
      if (stat.optional) {
        const keys = Object.keys(stat.optional);
        keys.forEach((key) => {
          if (key === formatDate(new Date()) && stat.optional) {
            setLearnWords(stat.optional[key]);
          }
        });
      }
    }
  }
  useEffect(() => {
    if (flag !== false) {
      fetchStatisticDay(localStorage.getItem('userId') as string)
        .then(
          () => {},
          () => {},
        );
    }
  });
  return (
    <div className="day-statistic">
      <p className="day-statistic__header">Результаты за сегодня</p>
      <div className="day-statistic__item">
        <p className="day-statistic__item_text">количество новых слов:</p>
        <p className="day-statistic__item_number">{newDayWords}</p>
      </div>
      <div className="day-statistic__item">
        <p className="day-statistic__item_text">количество изученных слов:</p>
        <p className="day-statistic__item_number">{learnWords}</p>
      </div>
      <div className="day-statistic__item">
        <p className="day-statistic__item_text">процент правильных ответов:</p>
        <p className="day-statistic__item_number">
          {percent}
          %
        </p>
      </div>
    </div>
  );
};

export default DayStatistic;
