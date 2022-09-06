import React, { FC } from 'react';
import DayStatistic from '~/components/dayStatistic/dayStatistic';
import Footer from '~/components/footer/footer';
import GameStatistic from '~/components/gameStatistic/gameStatistic';
import LearnedWordsGraf from '~/components/learnedWordsGraf/learnedWordsGraf';
import UserComponent from '~/components/userComponent/userComponent';
import { IStatistic } from '~/models/IStatistic';
import useStatistics from '~/hooks/useStatistics';
import './statistic.scss';

const StatisticPage: FC = () => {
  const stat = localStorage.getItem('statistics') !== 'Statistic is empty' && localStorage.getItem('statistics') !== null
    ? JSON.parse(localStorage.getItem('statistics') as string) as IStatistic
    : {
      learnedWords: 0,
    };
  const { countNewWords } = useStatistics();
  const newWords = countNewWords();
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
              <LearnedWordsGraf header="Общее количество изученных слов за весь период обучения по дням" lbl="изученные слова" labelsArray={(stat.learnedWords !== 0 && stat.optional) ? Object.keys(stat.optional) : ['0']} dataArray={(stat.learnedWords !== 0 && stat.optional) ? Object.values(stat.optional) : [0]} />
              <LearnedWordsGraf header="Количество новых слов за каждый день изучения" lbl="новые слова" labelsArray={newWords ? Object.keys(newWords) : ['0']} dataArray={newWords ? Object.values(newWords) : [0]} />
            </div>
            <Footer />
          </div>
        )
        : <div className="statistic__header">Для просмотра статистики необходимо авторизироваться</div>}
    </div>
  );
};

export default StatisticPage;
