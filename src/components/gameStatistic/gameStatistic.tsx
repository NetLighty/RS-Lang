import React, { FC, useEffect, useState } from 'react';
import { IAggregatedResponse } from '~/models/IAggregated';
import { ISettingsRes } from '~/models/ISetting';
import { getAggregatedWordsForStatistic } from '~/utils/aggregatedWordsFunc';
import formatDate from '~/utils/date';
import { getSettingsData } from '~/utils/setting.action';
import SETTINGS from '~/utils/settings';
import './gameStatistic.scss';

interface GameStatisticpProps {
  gameName: string
}

const GameStatistic: FC<GameStatisticpProps> = ({ gameName }) => {
  const [newWords, setNewWords] = useState(0);
  const [percent, setPercent] = useState(0);
  const [series, setSeries] = useState(0);

  let flag = true;
  async function fetchStatisticGame(id: string, token: string) {
    flag = false;
    const response = (await getSettingsData(id, token));
    const data = response as ISettingsRes;
    if (data.optional && data.optional.dataSettings === formatDate(new Date())) {
      if (gameName === 'audiogame') {
        if (data.optional.audioTotalCount !== 0) {
          setPercent(Math.ceil(
            // eslint-disable-next-line no-unsafe-optional-chaining
            (data.optional?.audioSuccess * 100) / data.optional.audioTotalCount,
          ));
        }
        setSeries(data.optional.audioSeries);
      } else if (gameName === 'sprint') {
        if (data.optional.sprintTotalCount !== 0) {
          setPercent(Math.ceil(
            // eslint-disable-next-line no-unsafe-optional-chaining
            (data.optional?.sprintSuccess * 100) / data.optional.sprintTotalCount,
          ));
        }
        setSeries(data.optional.sprintSeries);
      }
    }
    const filter = `{"userWord.optional.${gameName}":"${formatDate(new Date())}"}`;
    const aggregated = (await getAggregatedWordsForStatistic(id, token, filter));
    const aggreg: IAggregatedResponse[] = aggregated as IAggregatedResponse[];
    setNewWords(aggreg[0].totalCount[0].count);
  }

  useEffect(() => {
    if (flag !== false) {
      fetchStatisticGame(SETTINGS.USER_ID, SETTINGS.TOKEN)
        .then(
          () => {},
          () => {},
        );
    }
  }, []);
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
        <p className="game-statistic__item_number">{series}</p>
      </div>
    </div>
  );
};

export default GameStatistic;
