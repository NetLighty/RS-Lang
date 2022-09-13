import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useActions from '~/hooks/useAction';
import useTypedSelector from '~/hooks/useTypedSelector';
import useUpdateUserWord from '~/hooks/useUpdateUserWord';
import useUpsertSetting from '~/hooks/useUpsertSetting';
import { localStorageNames } from '~/utils/auth';
import './sprintResult.scss';
import SprintResultWord from './sprintResultWord';

const SprintResult: FC = () => {
  const {
    setSprintView,
  } = useActions();
  const {
    sprintCorrectWords,
    sprintWrongWords,
    sprintCorrectSerie,
  } = useTypedSelector((state) => state.sprint);
  const navigate = useNavigate();
  const { updateWord } = useUpdateUserWord();

  const goToMain = () => {
    navigate('/');
  };
  const restart = () => {
    setSprintView('start');
    navigate('/sprint');
  };
  useEffect(() => {
    const userId = localStorage.getItem(localStorageNames.userId);
    const isAuth = localStorage.getItem(localStorageNames.isAuth);
    if (userId && isAuth) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { upsertSettings } = useUpsertSetting(
        userId,
        'sprint',
        sprintCorrectWords.length + sprintWrongWords.length,
        sprintCorrectWords.length,
        sprintCorrectSerie,
        new Date(),
      );
      upsertSettings();
      sprintCorrectWords.forEach((word) => {
        updateWord(word, { result: true, game: 'sprint', dataupdate: new Date() });
      });
      sprintWrongWords.forEach((word) => {
        updateWord(word, { result: false, game: 'sprint', dataupdate: new Date() });
      });
    }
  }, []);
  return (
    <div className="result">
      <div className="result__container">
        <div className="result__head">
          <span className="title">Ваши результаты</span>
        </div>
        <div className="result__wrapper">
          <div className="words-list">
            <div className="words-list__title">
              <span>Ошибок</span>
              <span className="words-list__length words-list__length_wrong">{sprintWrongWords.length}</span>
            </div>
            {sprintWrongWords.map((word) => (
              <SprintResultWord key={word.id} word={word} />
            ))}
            <hr />
          </div>
          <div className="words-list">
            <div className="words-list__title">
              <span>Знаю</span>
              <span className="words-list__length words-list__length_correct">{sprintCorrectWords.length}</span>
            </div>
            {sprintCorrectWords.map((word) => (
              <SprintResultWord key={word.id} word={word} />
            ))}
          </div>
        </div>
        <div className="result__buttons">
          <button onClick={goToMain} className="orange" type="button">Выйти на главную</button>
          <button onClick={restart} className="green" type="button">Играть ещё раз</button>
        </div>
      </div>
    </div>
  );
};

export default SprintResult;
