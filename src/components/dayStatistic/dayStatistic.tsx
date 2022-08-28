import React, { FC, useEffect, useState } from 'react';
import { ISettingsRes } from '~/models/ISetting';
import { getSettingsData } from '~/utils/setting.action';
import SETTINGS from '~/utils/settings';
import './dayStatistic.scss';

const DayStatistic: FC = () => {
  const [percent, setPercent] = useState(0);
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
        <p className="day-statistic__item_number">0</p>
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
