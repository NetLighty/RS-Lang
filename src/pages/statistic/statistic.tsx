import React, { FC } from 'react';
import DayStatistic from '~/components/dayStatistic/dayStatistic';
import GameStatistic from '~/components/gameStatistic/gameStatistic';
import UserComponent from '~/components/userComponent/userComponent';
import './statistic.scss';

// eslint-disable-next-line react/function-component-definition
const StatisticPage: FC = () => (
  <div className="statistic">
    <div className="statistic__header">Статистика</div>
    <div className="statistic__container">
      <UserComponent />
      <GameStatistic gameName="audiogame" />
      <DayStatistic />
      <GameStatistic gameName="sprint" />
    </div>
  </div>
);

export default StatisticPage;
