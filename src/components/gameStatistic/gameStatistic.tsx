import React, { FC, useEffect, useState } from 'react';
import { IAggregatedResponse } from '~/models/IAggregated';
import { ISettingsRes } from '~/models/ISetting';
import { getAggregatedWordsForStatistic } from '~/utils/aggregatedWordsFunc';
import { getSettingsData } from '~/utils/setting.action';
import SETTINGS from '~/utils/settings';
import './gameStatistic.scss';

interface GameStatisticpProps {
  gameName: string
}

const GameStatistic: FC<GameStatisticpProps> = ({ gameName }) => {
  const [newWords, setNewWords] = useState(0);
  const [percent, setPercent] = useState(0);
  let flag = true;
  async function fetchStatisticGame(id: string, token: string) {
    flag = false;
    const response = (await getSettingsData(id, token));
    const data = response as ISettingsRes;
    if (data.optional) {
      if (gameName === 'audiogame') {
        if (data.optional.audioTotalCount !== 0) {
          setPercent(Math.ceil(
            // eslint-disable-next-line no-unsafe-optional-chaining
            (data.optional?.audioSuccess * 100) / data.optional.audioTotalCount,
          ));
        }
      } else if (gameName === 'sprint') {
        if (data.optional.sprintTotalCount !== 0) {
          setPercent(Math.ceil(
            // eslint-disable-next-line no-unsafe-optional-chaining
            (data.optional?.sprintSuccess * 100) / data.optional.sprintTotalCount,
          ));
        }
      }
    }
    const date = new Date() as unknown as string;
    // приведение к формату даты
    const filter = `{"userWord.optional.${gameName}":"${date}"}`;
    const aggregated = (await getAggregatedWordsForStatistic(id, token, filter));
    const aggreg: IAggregatedResponse[] = aggregated as IAggregatedResponse[];
    setNewWords(aggreg[0].paginatedResults.length);
  }
  // getSettingsData
  useEffect(() => {
    if (flag !== false) {
      fetchStatisticGame(SETTINGS.USER_ID, SETTINGS.TOKEN)
        .then(
          () => {},
          () => {},
        );
    }
  });
  return (
    <div className="game-statistic">
      <p className="game-statistic__header">{(gameName === 'audiogame') ? 'Аудиовызов' : 'Спринт'}</p>
      <div className="game-statistic__item">
        <p className="game-statistic__item_text">количество новых слов:</p>
        <p className="game-statistic__item_number">{newWords}</p>
      </div>
      <div className="game-statistic__item">
        <p className="game-statistic__item_text">процент правильных ответов:</p>
        <p className="game-statistic__item_number">
          {percent}
          %
        </p>
      </div>
      <div className="game-statistic__item">
        <p className="game-statistic__item_text">самая длинная серия:</p>
        <p className="game-statistic__item_number">{}</p>
      </div>
    </div>
  );
};

export default GameStatistic;
