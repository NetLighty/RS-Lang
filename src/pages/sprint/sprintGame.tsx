import React, { FC, useEffect, useState } from 'react';
import WordService from '~/api/wordsService';
import Timer from '~/components/timer/timer';
import useActions from '~/hooks/useAction';
import useTypedSelector from '~/hooks/useTypedSelector';
import { IWord } from '~/models/IWord';
import './sprintPage.scss';

const SprintGame: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [words, setwords] = useState<IWord[][]>([]);
  const { sprintWords } = useTypedSelector((state) => state.sprint);
  const {
    setSprintWords,
  } = useActions();

  useEffect(() => {
    setIsLoading(true);
    if (sprintWords.length === 0) {
      const getWords = async () => {
        // const randomPage = Math.floor(Math.random() * 30);
        const promises = [];
        const wordss: IWord[][] = [];
        for (let i = 0; i < 30; i += 1) {
          const promise = WordService.getChunkOfWords('5', `${i}`);
          promises.push(promise);
        }
        await Promise.all(promises).then((responses) => {
          responses.forEach((res) => {
            wordss.push(res.data);
          });
        });
        console.log(wordss);
        setSprintWords(wordss.flat());
        return wordss;
      };
      getWords().then((resWords) => {
        setwords(resWords);
      })
        .catch((e) => {
          console.log(e);
        });
    }
    setTimeout(() => setIsLoading(false), 2000);
  }, []);
  return (
  // eslint-disable-next-line react/jsx-no-useless-fragment
    <div className="sprint">
      {isLoading ? 'Loading' : (
        <>
          <div className="sprint__info">
            <div className="sprint__timer">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M11.4819568,10.0677432 C11.6471834,10.0235573 11.8208407,10 12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 C10.8954305,14 10,13.1045695 10,12 C10,11.8208407 10.0235573,11.6471834 10.0677432,11.4819568 L6.29289322,7.70710678 L7.70710678,6.29289322 L11.4819568,10.0677432 Z M13,3.05492878 L13,7 L11,7 L11,1 L12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 C5.92486775,23 1,18.0751322 1,12 C1,9.03657516 2.17863997,6.25738075 4.23642055,4.20725745 L5.64799552,5.62410469 C3.9631621,7.30266862 3,9.57377327 3,12 C3,16.9705627 7.02943725,21 12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.36744635 17.4999505,3.55237307 13,3.05492878 Z"
                />
              </svg>
              <Timer />
            </div>
            <div className="sprint__points">
              <div className="sprint__points-total">Очки: 0</div>
              <div className="sprint__points-addition">+10 очков за слово</div>
            </div>
          </div>
          <div className="shadow-inset">
            <div className="sprint__words">
              <span>Phenominal</span>
              <span>Сахар</span>
            </div>
          </div>
          <div className="sprint__buttons">
            <button className="sprint__button false" type="button" id="1">
              НЕВЕРНО
            </button>
            <button className="sprint__button true" type="button" id="0">
              ВЕРНО
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SprintGame;
