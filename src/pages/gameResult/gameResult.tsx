import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../../ui/loader/loader';
import WordService from '../../api/wordsService';
import ResultWord from '../../components/resultWord/resultWord';
import { IAnswer } from '../../models/IAnswer';
import { IResultWord } from '../../models/IResultWord';
import { useSelector, useDispatch } from 'react-redux';
import createResultWord from '../../utils/createResultWord';
import './gameResult.scss';
import useGetUserWords from '~/hooks/useGetUserWords';
import useUpdateUserWord from '~/hooks/useUpdateUserWord';
import useUpsertSetting from '~/hooks/useUpsertSetting';
import SETTINGS from '~/utils/settings';

interface GameResultProps {
  nameResult: string;
}

const GameResult: FC<GameResultProps> = ({ nameResult }) => {
  const [result, setResult] = useState<IResultWord[]>([]);
  const [loading, setLoading] = useState(true);
  const answerArr = JSON.parse(localStorage.getItem(nameResult) as string) as IAnswer[];
  const successResult = answerArr.filter((item) => item.answer === true);
  //  const { dowloadUserWords } = useGetUserWords();
  const { dowloadUserWords, userWords } = useGetUserWords();
  const dispatch = useDispatch();
  const { updateWord } = useUpdateUserWord();
  const nowdDate = new Date();
  const gameName = (localStorage.gameName === 'audiogame') ? 'audiogame' : 'sprint';

  const { upsertSettings } = useUpsertSetting(
    SETTINGS.USER_ID,
    SETTINGS.TOKEN,
    gameName,
    answerArr.length,
    successResult.length,
    nowdDate,
  );

  let flag: boolean;
  const isAuth = true;

  function getResult() {
    flag = false;
    const arr: IResultWord[] = [];
    answerArr.forEach((item: IAnswer) => {
      const el = WordService.getWord(item.id)
        .then((response) => {
          if (isAuth) {
            updateWord(response.data, {
              result: item.answer, game: gameName, dataupdate: (new Date()).toString(),
            });
          }
          const obj: IResultWord = createResultWord(
            response.data.word,
            response.data.wordTranslate,
            response.data.audio,
            item.answer,
          );
          arr.push(obj);
        });
    });
    setResult(arr);
  }

  useEffect(() => {
    if (flag !== false) {
      getResult();
      if (isAuth) {
        dowloadUserWords();
        upsertSettings();
      }
    }
    setTimeout(() => { setLoading(false); }, 2000);
  }, []);

  return (
    <div className="gameresult">
      { (loading === true)
        ? <div className="gameresult__loader"><Loader /></div>
        : (
          <div>
            <NavLink className="gameresult__close _icon-close" to="/" />
            <div className="gameresult__contaniner">
              <div className="gameresult__header">Твои результаты</div>
              {result.map((item) => <ResultWord key={item.word} item={item} prefixClass="gameresult" />)}
              <NavLink className="gameresult__repeat _icon-refresh" to="/audiocall/game" />
            </div>
          </div>
        )}
    </div>
  );
};

export default GameResult;
