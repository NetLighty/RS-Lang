import React, { useEffect, useState } from 'react';
import SETTINGS from '~/utils/settings';
import { useAppSelector } from '~/hooks';
import { IWord } from '~/models/IWord';
import { IUserWord } from '~/models/IUserWord';
import { getWordById } from '~/utils/getWordById';
import CardWord from '../cardWithWord/cardWord';

const HardWordContainer = () => {
  const [bookPageArray, setBookPageArray] = useState<Array<IUserWord & IWord>>([]);
  const userWords = useAppSelector((state) => state.userWords);
  const words = useAppSelector((state) => state.words);

  function addItemsToArray(array:Array<IWord & IUserWord>, item1:IWord, item2:IUserWord) {
    array.push({ ...item2, ...item1 });
    setBookPageArray([...array]);
  }

  useEffect(() => {
    let userWordsArray:IUserWord[] = [];
    Object.values(userWords).forEach((item) => {
      Object.values(item).forEach((word) => { userWordsArray = [...userWordsArray, ...word]; });
    });
    const wordsResult:Array<IWord & IUserWord> = [];
    userWordsArray
      .filter((word:IUserWord) => word.difficulty === SETTINGS.HARD_WORD)
      .forEach((iWord:IUserWord) => {
        if (iWord.optional) {
          if (words[iWord.optional?.group] && words[iWord.optional?.group][iWord.optional?.page]) {
            const findWord:IWord | undefined = words[iWord.optional?.group][iWord.optional?.page]
              .find((item) => item.id === iWord.optional?.id);
            if (findWord) {
              addItemsToArray(wordsResult, findWord, iWord);
            }
          } else {
            getWordById(iWord.optional.id)
              .then((data) => {
                const findWord = data as IWord;
                return findWord;
              })
              .then((findWord) => addItemsToArray(wordsResult, findWord, iWord))
              .catch(() => {});
          }
        }
      });
  }, [userWords, words]);

  return (
    <div className="book__cards">
      {bookPageArray?.length
        ? bookPageArray.map((word: IWord & IUserWord) => <CardWord key={word.id} word={word} />)
        : null}
    </div>
  );
};

export default HardWordContainer;
