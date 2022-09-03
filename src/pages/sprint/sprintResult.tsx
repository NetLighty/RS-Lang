import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import useActions from '~/hooks/useAction';
import useTypedSelector from '~/hooks/useTypedSelector';
import './sprintResult.scss';
import SprintResultWord from './sprintResultWord';

const SprintResult: FC = () => {
  const { setSprintView } = useActions();
  const { sprintCorrectWords, sprintWrongWords } = useTypedSelector((state) => state.sprint);
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/');
  };
  const restart = () => {
    setSprintView('start');
    navigate('/sprint');
  };
  /* useEffect(() => {
    console.log('работаю');
    setSprintView('start');
  }, []); */
  return (
    <div className="result">
      <div className="result__container">
        <div className="result__head">
          <span className="title">Ваши результаты</span>
        </div>
        <div className="result__wrapper">
          <div className="words-list">
            <div className="words-list__title">
              <span>Ошибки</span>
              <span className="words-list__length words-list__length_wrong">{sprintWrongWords.length}</span>
            </div>
            {sprintWrongWords.map((word) => (
              <SprintResultWord key={word.id} word={word} />
            ))}
          </div>
          <div className="words-list">
            <div className="words-list__title">
              <span>Верно</span>
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
