import React, { FC, useEffect } from 'react';
import useActions from '~/hooks/useAction';
import useTypedSelector from '~/hooks/useTypedSelector';
import GameLevel from '../gameLevel/gameLevel';
import SprintGame from './sprintGame';
import './sprintPage.scss';
import SprintResult from './sprintResult';

const SprintPage: FC = () => {
  const { sprintView } = useTypedSelector((state) => state.sprint);
  const { setSprintView, setSprintCorrectWords, setSprintWrongWords } = useActions();
  useEffect(() => {
    setSprintView('start');
    setSprintCorrectWords([]);
    setSprintWrongWords([]);
  }, []);
  return (
    <>
      {sprintView !== 'start' ? null : <GameLevel gameName="Спринт" />}
      {sprintView !== 'game' ? null : <SprintGame />}
      {sprintView !== 'result' ? null : <SprintResult />}
    </>
  );
};

export default SprintPage;
