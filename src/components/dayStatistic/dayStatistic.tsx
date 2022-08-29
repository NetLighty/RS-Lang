import React, { FC, useEffect, useState } from 'react';
import { IAggregatedResponse } from '~/models/IAggregated';
import { ISettingsRes } from '~/models/ISetting';
import { getAggregatedWordsForStatistic } from '~/utils/aggregatedWordsFunc';
import formatDate from '~/utils/date';
import removeDuplicates from '~/utils/removeDublicat';
import { getSettingsData } from '~/utils/setting.action';
import SETTINGS from '~/utils/settings';
import './dayStatistic.scss';

const DayStatistic: FC = () => {
  const [percent, setPercent] = useState(0);
  const [newDayWords, setNewDayWords] = useState(0);

  let flag = true;
  async function fetchStatisticDay(id: string, token: string) {
    flag = false;
    const response = (await getSettingsData(id, token));
    const data = response as ISettingsRes;
    if (data.optional) {
      const totalCount = data.optional.audioTotalCount + data.optional.sprintTotalCount;
      // eslint-disable-next-line no-unsafe-optional-chaining
      const seccessWords = data.optional?.audioSuccess + data.optional?.sprintSuccess;
      if (totalCount !== 0) {
        setPercent(Math.ceil(
          (seccessWords * 100) / totalCount,
        ));
      }
      const date = new Date();
      const filter = `{"userWord.optional.sprint":"${formatDate(date)}"}`;
      const sprintNewWords = (await getAggregatedWordsForStatistic(id, token, filter));
      const sprintNew: IAggregatedResponse[] = sprintNewWords as IAggregatedResponse[];
      const bufSprintNew = sprintNew[0].paginatedResults.filter(
        (item) => (item.userWord.optional?.audiogame >= item.userWord.optional?.sprint) || item.userWord.optional?.audiogame === '0',
      );
      const filterAudio = `{"userWord.optional.audiogame":"${formatDate(date)}"}`;
      const audioNewWords = (await getAggregatedWordsForStatistic(id, token, filterAudio));
      const audioNew: IAggregatedResponse[] = audioNewWords as IAggregatedResponse[];
      console.log(audioNewWords);
      const bufAudioNew = audioNew[0].paginatedResults.filter(
        (item) => (item.userWord.optional?.sprint >= item.userWord.optional?.audiogame) || item.userWord.optional?.sprint === '0',
      );
      setNewDayWords((removeDuplicates(bufSprintNew.concat(bufAudioNew))).length);
    }
  }
  useEffect(() => {
    if (flag !== false) {
      fetchStatisticDay(SETTINGS.USER_ID, SETTINGS.TOKEN)
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
        <p className="day-statistic__item_number">0</p>
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
