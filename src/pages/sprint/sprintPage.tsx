import React, { FC, useEffect } from 'react';
import useActions from '~/hooks/useAction';
import useTypedSelector from '~/hooks/useTypedSelector';
import { localStorageNames } from '~/utils/auth';
import GameLevel from '../gameLevel/gameLevel';
import SprintGame from './sprintGame';
import './sprintPage.scss';
import SprintResult from './sprintResult';

interface SprintPageProps {
  isFromBook?: boolean;
}

const SprintPage: FC<SprintPageProps> = ({ isFromBook }) => {
  SprintPage.defaultProps = {
    isFromBook: false,
  };
  const { sprintView } = useTypedSelector((state) => state.sprint);
  const { setSprintView, setSprintCorrectWords, setSprintWrongWords } = useActions();
  useEffect(() => {
    setSprintView('start');
    setSprintCorrectWords([]);
    setSprintWrongWords([]);
    console.log(isFromBook);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {sprintView !== 'start' ? null : <GameLevel gameName="Спринт" difficultyLevel={isFromBook ? localStorage.getItem(localStorageNames.bookGroup) || undefined : undefined} />}
      {sprintView !== 'game' ? null
        : (
          <SprintGame
            bookGroup={isFromBook
              ? localStorage.getItem(localStorageNames.bookGroup) || undefined : undefined}
            bookPage={isFromBook
              ? localStorage.getItem(localStorageNames.bookPage) || undefined : undefined}
          />
        )}
      {sprintView !== 'result' ? null : <SprintResult />}
    </>
  );
};

export default SprintPage;
