import React, { FC, useState } from 'react';
import GameLevel from '../gameLevel/gameLevel';
import SprintGame from './sprintGame';
import './sprintPage.scss';

type View = 'start' | 'game' | 'result';

const SprintPage: FC = () => {
  const [view, setView] = useState<View>('start');

  return (
  // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {view !== 'start' ? null : <GameLevel gameName="Спринт" />}
      {view !== 'game' ? null : <SprintGame />}
    </>
  );
};

export default SprintPage;
