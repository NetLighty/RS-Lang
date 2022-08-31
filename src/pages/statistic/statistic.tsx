import React, { FC } from 'react';
import DayStatistic from '~/components/dayStatistic/dayStatistic';
import GameStatistic from '~/components/gameStatistic/gameStatistic';
import UserComponent from '~/components/userComponent/userComponent';
import './statistic.scss';

const StatisticPage: FC = () => {
  const isAuth = localStorage.auth as string;
  return (
    <div className="statistic">
      { isAuth === 'true'
        ? (
          <div>
            <div className="statistic__header">Статистика</div>
            <div className="statistic__container">
              <UserComponent />
              <GameStatistic gameName="audiogame" />
              <DayStatistic />
              <GameStatistic gameName="sprint" />
            </div>
          </div>
        )
        : <div className="statistic__header">Для просмотра статистики необходимо авторизироваться</div>}
    </div>
  );
};

export default StatisticPage;
