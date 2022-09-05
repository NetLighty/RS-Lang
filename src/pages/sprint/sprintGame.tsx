import React, { FC, useEffect, useState } from 'react';
import WordService from '~/api/wordsService';
import ArrowSvg from '~/components/arrow/arrow';
import Timer from '~/components/timer/timer';
import useActions from '~/hooks/useAction';
import useTypedSelector from '~/hooks/useTypedSelector';
import { IAggregatedResponse } from '~/models/IAggregated';
import { IWord } from '~/models/IWord';
import Loader from '~/ui/loader/loader';
import { getAggregatedWordsForGame } from '~/utils/aggregatedWordsFunc';
import { localStorageNames } from '~/utils/auth';
import { basePointsAdd, maxPointsMultiply } from '~/utils/rules/sprintRules';
import { alternativeShuffle } from '~/utils/subGameFunc';
import './sprintPage.scss';

interface SprintGameProps {
  bookPage?: string,
  bookGroup?: string,
}

const SprintGame: FC<SprintGameProps> = ({ bookGroup, bookPage }) => {
  SprintGame.defaultProps = {
    bookGroup: '',
    bookPage: '',
  };
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentWords, setCurrentWords] = useState<IWord[]>([]);
  const [currentWord, setCurrentWord] = useState<IWord>();
  const [points, setPoints] = useState<number>(0);
  const [pointsAdditing, setPointsAdditing] = useState<number>(basePointsAdd);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<string>('');
  const [correctAnswersRow, setCorrectAnswersRow] = useState<number>(0);
  const [correctAnswersSerie, setCorrectAnswersSerie] = useState<number>(0);
  const [maxCorrectAnswersSerie, setMaxCorrectAnswersSerie] = useState<number>(0);
  const [potentialTranslate, setPotentialTranslate] = useState<string>();
  const {
    sprintWords,
    sprintCorrectWords,
    sprintWrongWords,
    sprintView,
  } = useTypedSelector((state) => state.sprint);
  let timer: NodeJS.Timeout;
  const {
    setSprintCorrectWords,
    setSprintWrongWords,
    setSprintView,
    setSprintCorrectSerie,
  } = useActions();

  const endGame = () => {
    if (sprintView === 'game') {
      setTimeout(() => setSprintView('result'), 100);
    }
  };

  const initWords = (words: IWord[]) => {
    const filteredWords = words.filter((word) => word.id !== currentWord?.id);
    if (filteredWords.length === 0) {
      endGame();
    } else {
      const newWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
      setCurrentWord(newWord);
      if (Math.floor(Math.random() * 2)) {
        setPotentialTranslate(newWord.wordTranslate);
      } else {
        setPotentialTranslate(
          filteredWords[Math.floor(Math.random() * filteredWords.length)].wordTranslate,
        );
      }
    }
  };

  const addPointsAdditing = () => {
    if (pointsAdditing === basePointsAdd * (2 ** maxPointsMultiply)) return;
    setPointsAdditing(pointsAdditing * 2);
  };

  const addCorrectAnswersRow = () => {
    if (correctAnswersRow < 3) {
      setCorrectAnswersRow(correctAnswersRow + 1);
    } else {
      setCorrectAnswersRow(0);
      addPointsAdditing();
    }
  };

  const addCorrectAnswersSerie = () => {
    setCorrectAnswersSerie(correctAnswersSerie + 1);
    if (correctAnswersSerie + 1 > maxCorrectAnswersSerie) {
      setMaxCorrectAnswersSerie(correctAnswersSerie + 1);
      setSprintCorrectSerie(correctAnswersSerie + 1);
    }
  };

  const submitAnswer = (
    word: IWord | undefined,
    translate: string | undefined,
    answer: boolean,
  ) => {
    if (word && translate) {
      setCurrentWords(currentWords.filter((currWord) => word.id !== currWord.id));
      const isTranslateCorrect = word.wordTranslate === translate;
      if (isTranslateCorrect === answer) {
        setSprintCorrectWords([...sprintCorrectWords, word]);
        setPoints(points + pointsAdditing);
        setIsCorrectAnswer('true');
        addCorrectAnswersRow();
        addCorrectAnswersSerie();
      } else {
        setSprintWrongWords([...sprintWrongWords, word]);
        setCorrectAnswersRow(0);
        setIsCorrectAnswer('false');
        setPointsAdditing(basePointsAdd);
        setCorrectAnswersSerie(0);
      }
      initWords(currentWords);
    }
  };

  const keyUpHandler = (e: React.KeyboardEvent) => {
    if (e.code === 'ArrowLeft') {
      submitAnswer(currentWord, potentialTranslate, false);
    }
    if (e.code === 'ArrowRight') {
      submitAnswer(currentWord, potentialTranslate, true);
    }
  };

  const getUnlearnedWords = async (page: string) => {
    if (bookGroup?.length && bookPage?.length) {
      const allWordsPromises = [];
      for (let i = Number(page); i > -1; i -= 1) {
        const wordsRes = WordService.getChunkOfWords(bookGroup, `${i}`);
        allWordsPromises.push(wordsRes);
      }
      const allWordsResponses = await Promise.all(allWordsPromises);
      const allWords = allWordsResponses.map((wordRes) => wordRes.data).flat();
      const aggregatedRes = await getAggregatedWordsForGame(
        localStorage.getItem(localStorageNames.userId) || '',
        '{"userWord.optional.learned":true}',
        bookGroup,
      ) as IAggregatedResponse[];
      const aggregatedWords = aggregatedRes[0].paginatedResults;
      const unlearnedWords = allWords.filter(
        (word) => !aggregatedWords.find((aggregatedWord) => aggregatedWord.word === word.word),
      );
      return unlearnedWords;
    }
    return [];
  };

  const getAllGroupWords = async () => {
    const difficultyLevel = localStorage.getItem(`${localStorageNames.sprintNameRus}level`);
    const wordsGroup = difficultyLevel ? `${+difficultyLevel - 1}` : '0';
    const words: IWord[][] = [];
    const promises = [];
    for (let i = 0; i < 30; i += 1) {
      const promise = WordService.getChunkOfWords(wordsGroup, `${i}`);
      promises.push(promise);
    }
    await Promise.all(promises).then((responses) => {
      responses.forEach((res) => {
        words.push(res.data);
      });
    });
    initWords(alternativeShuffle(words.flat()));
    return words.flat();
  };

  const startGame = () => {
    localStorage.removeItem(localStorageNames.bookGroup);
    localStorage.removeItem(localStorageNames.bookPage);
    setSprintCorrectSerie(0);
    setIsLoading(false);
    if (!timer) timer = setTimeout(() => endGame(), 6000);
  };

  useEffect(() => {
    if (sprintView === 'game') {
      setIsLoading(true);
      setSprintCorrectWords([]);
      setSprintWrongWords([]);
      if (sprintWords.length === 0) {
        const getWords = async () => {
          let gameWords: IWord[] = [];
          if (bookPage && bookPage?.length !== 0) {
            const unlearnedWords = await getUnlearnedWords(bookPage);
            gameWords = unlearnedWords;
          } else {
            const allGroupWords = await getAllGroupWords();
            gameWords = allGroupWords;
          }
          initWords(gameWords);
          return gameWords;
        };
        getWords()
          .then((resWords) => {
            setCurrentWords(resWords);
            setTimeout(() => startGame(), 700);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);

  useEffect(() => () => {
    if (timer) {
      clearTimeout(timer);
      setSprintView('result');
    }
  }, []);
  return (
    <div className="sprint" tabIndex={0} onKeyUp={keyUpHandler}>
      {isLoading ? (
        <div className="loading-circle"><Loader /></div>
      ) : (
        <div className="sprint-container">
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
              <div className="sprint__points-total">
                Очки:
                {' '}
                {points}
              </div>
              <div className="sprint__points-addition">{`+${pointsAdditing} очков за слово`}</div>
            </div>
          </div>
          <div className="sprint__correct-row">
            <div className={`row-circle ${correctAnswersRow > 0 ? 'row-circle_green' : ''}`} />
            <div className={`row-circle ${correctAnswersRow > 1 ? 'row-circle_green' : ''}`} />
            <div className={`row-circle ${correctAnswersRow > 2 ? 'row-circle_green' : ''}`} />
          </div>
          <div onAnimationEnd={() => setIsCorrectAnswer('')} className={`shadow-inset shadow-inset_${isCorrectAnswer}`}>
            <div className={`sprint__words sprint__words_${isCorrectAnswer}`}>
              <span>{currentWord?.word}</span>
              <span>{potentialTranslate}</span>
            </div>
          </div>
          <div className="sprint__buttons">
            <div className="sprint__button__container">
              <ArrowSvg className="arrow-left" />
              <button onClick={() => submitAnswer(currentWord, potentialTranslate, false)} className="sprint__button sprint__button_false" type="button" id="1">
                НЕВЕРНО
              </button>
            </div>
            <div className="sprint__button__container">
              <button onClick={() => submitAnswer(currentWord, potentialTranslate, true)} className="sprint__button sprint__button_true" type="button" id="0">
                ВЕРНО
              </button>
              <ArrowSvg className="arrow-right" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SprintGame;
